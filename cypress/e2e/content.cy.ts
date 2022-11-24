// Author: Yue Ma
// Date: 21 Nov, 2022

import { RACING_CATEGORIES } from "../config/constants";

describe('Page Content', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should correctly display page title', () => {
    cy.get('[data-testid=page-title]').contains('Next To Go Races').and('be.visible');
  });

  it('Should have all filters checked by default', () => {
    cy.get('[data-testid=category-filters]').within(() => {
      RACING_CATEGORIES.forEach((category) => {
        cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(() => {
          cy.get('[data-testid=category-filter-label]').contains(category.name).and('be.visible');
          cy.get('[data-testid=category-filter-checkbox]').should('be.checked');
        });
      })
    })
  });

  it('Should display the v race numbers format', () => {
    cy.get('.item').should('be.visible').should('have.length', 5).then(() => {
      cy.get('.race-name .race-number').then(($raceNum)=> {
        $raceNum.toArray().forEach(num => {
          const raceNum = num.innerText;
          expect(raceNum).to.match(/R[1-9]\d{0,1}$/);
          });
        })
      })
  });

  it('Should display the valid horse name', () => {
    cy.get('.race-name .race-number').next().should('be.visible').then(($horseName) => {
      $horseName.toArray().forEach(horseName => {
        const name = horseName.innerText;
        expect(name).to.match(/\w/);
        cy.log("Animal name: " + name);
      });
      // cy.get("div .race-name p").as('raceName').should('be.visible').then(($raceNames) => {
      //   $raceNames.each(function(index, element) {
      //     const raceNameStr = element.innerText;
      //     expect(raceNameStr).to.match(/\w/);
      //   });
      // });
    })
  });

  it('Should display the correct timer format', () => {
    cy.get('div .item > p').should('be.visible').then(($timer) => {
      $timer.toArray().forEach(el => {
        const timer = el.innerText;
        // expect(timer).to.match(/(\-*\d{1,2}(m|s)\s*\d{1,2}(m|s))|(\-*\d{1,2}(m|s))/);
        // match any valid timer format '52m', '24s' , '13m 23s', NOT any nagative '-38s'
        expect(timer).to.match(/(^\d{1,2}(m|s)\s*\d{1,2}(m|s))|(^\d{1,2}(m|s))/); 
      });
    })
  });

  it.only('Should display the races by ascending order time', () => {
    cy.get('.item > p').then(($timer) => {
      $timer.each(function(index, element) {
        cy.log(`#${index + 1} Time: ${element.innerHTML}`)
        
      })
    })
  });

})
