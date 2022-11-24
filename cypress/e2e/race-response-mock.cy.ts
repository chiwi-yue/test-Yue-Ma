// Author: Yue Ma
// Date: 21 Nov, 2022

const now = new Date("2022-11-21T01:35:34Z")

describe('Simulate response from server', () => {
    beforeEach(() => {
        // stub a time for matching the counter based on 'advertised_start',
        // otherwise it won't show the races properly
        cy.clock(now);
        cy.intercept(
            {
              url: '/',
              middleware: true,
            },
            (req) => {
              req.on('response', (res) => {
                // Throttle the response to 1 Mbps to simulate a
                // mobile 3G connection
                res.setThrottle(1000)
              })
            }
          ).as('slowConnectionSimulation');
      });

    it('Mock response from server by seeding fixture data', () => {
        // spy on GET requests to /v2/racing/next-races-category-group endpoint
        cy.intercept(
            {
                method: 'GET',
                // match any request that satisfies a glob pattern
                url:'/v2/racing/next-races-category-group?count=5&categories=*'
            },
            //['Stub: I am ok']
            // instead, here to use fixure response :) 
            { fixture: 'fake-race-result.json' }
        ).as('getRaces')
        cy.visit('/');
    });

    it('Stub custom response from server', () => {
        cy.intercept(
            'GET',
            '/v2/racing/next-races-category-group?count=5&categories=*', 
            (req) => {
                req.reply(
                    {
                        headers: {'Set-Cookie': 'newUserName=Yue Ma'},
                        statusCode: 200,
                        body: {
                            name: 'Yue Ma',
                            occupation: 'Automation Engineer',
                            client: 'Entain',
                            task: 'Cypress Skill Test'
                        },
                        delay: 100, // milliseconds
                        throttleKbps: 1000, // to simulate a 3G connection
                        forceNetworkError: false // default
                    });
            }).as('studResponse')
        cy.visit('/');
    });

    it('stub network failure', () => {
        cy.intercept(
            'GET',
            '/v2/racing/*',
            { forceNetworkError: true },
            )
            .as('getNetworkFaiure')
        cy.visit('/');
        cy.wait('@getNetworkFaiure')
        cy.get('[data-testid="page-title"]').should('be.visible')
    });

    it('stub server 500 failure', () => {
        cy.intercept(
            'GET',
            '/v2/racing/next-races-category-group?count=5&categories=*', 
            {
                statusCode: 500,
                body: {
                    message: 'Oops Entain server went wrong!'
                }
            })
            .as('getServerFaiure')
        cy.visit('/');
        cy.wait('@getServerFailure')
        cy.get('[data-testid="page-title"]').should('be.visible')
        
    });
})