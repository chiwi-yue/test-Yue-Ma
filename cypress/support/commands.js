/// <reference types="cypress" />

// const regExpHour = new RegExp(/^\d{1,2}h/); // timer format: '8h'
// const regExpMinSec = new RegExp(/^\d{1,2}(m|s)\s*\d{1,2}(m|s)/); // timer format: '21m 46s'
// const regExpMin = new RegExp(/^\d{1,2}m/); // timer format: '37m'
// const regExpSec = new RegExp(/^\d{1,2}s/); // timer format: '25s'

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// declare global {
//   namespace Cypress {
//     interface Chainable {
//     //   login(email: string, password: string): Chainable<void>
//     //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const date = new Date();
date.setHours(date.getHours() - 2); // Rewind app clock hours backwards two hours
const regExpHour = new RegExp(/\-*\d{1,2}h/); // timer format: '8h|-12h'
const regExpPositiveMinSec = new RegExp(/^\d{1,2}(m|s)\s*\d{1,2}(m|s)/); // timer format: '19m 23s'
const regExpNegativeMinSec = new RegExp(/\-*\d{1,2}(m|s)\s*\d{1,2}(m|s)/); // timer format: '-21m 46s'
const regExpMin = new RegExp(/\-*\d{1,2}m/); // timer format: '37m|-2m'
const regExpSec = new RegExp(/\-*\d{1,2}s/); // timer format: '25s|-20s'


Cypress.Commands.add('tickTime', (tickHour) => {
    const timeArray = [];
    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach(el => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        timeArray.push(time);
      } else if (regExpMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        timeArray.push(time);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        timeArray.push(time);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        timeArray.push(time);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      });
    });

    cy.tick(1000 * 60 * 60 * tickHour);
    cy.wait(100);

    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach((el, index) => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      });
    });
});
