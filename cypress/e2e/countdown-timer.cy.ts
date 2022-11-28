// Author: Yue Ma
// Date: 28 Nov, 2022

/// <reference types="cypress" />

describe('Countdown Timer', () => {
  // Initial a testing timestamp based on the testing execution time
  const date = new Date();
  // Rewind the app system clock hours backwards two hours for further testing purpose as pre-condition
  date.setHours(date.getHours() - 2); 
  // Set time for each case as baseline 
  beforeEach(() => {
    cy.clock(date);
    cy.visit('/')
  });

  // Below three cases would cover all combinations of timer format validation
  // Timer format as '1h' or greater (ONLY hour)
  it('The timer should count down correctly great than one hour', () => {
    cy.tickTime('1');
  });

  // Timer format as '4m 57s' or '9m' (NO hour, only 'm' and or 'm + s')
  it('The timer should count down correctly less than one hour', () => {
    cy.tickTime('2');
  });

  // Timer fomrat as '-22m' (NO hour, but only negative time (m) indicates passed race)
  it('The timer should count down correctly when the match already passed', () => {
    cy.tickTime('2.5');
  });
});