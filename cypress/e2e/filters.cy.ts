import { RACING_CATEGORIES } from "../config/constants";

describe('Category Filters', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  // Testing failed because defect against spec
  it('Should uncheck successfully for all categoriesy', () => {
    RACING_CATEGORIES.forEach((category) => {
      cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(() => {
        cy.get('[data-testid=category-filter-checkbox]').uncheck().should('not.be.checked');
      });
    })
  });

  it('Should check successfully for all categories', () => {
    RACING_CATEGORIES.forEach((category) => {
      cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(() => {
        cy.get('[data-testid=category-filter-checkbox]').check().should('be.checked');
      });
    })
  });

  // Testing failed because defect against spec
  it('Should empty the list when no filter applied', () => {
    RACING_CATEGORIES.forEach((category) => {
      cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(() => {
        cy.get('[data-testid=category-filter-checkbox]').uncheck();
      });
    })
    cy.get('[data-testid=category-filters]').next().should('be.empty')
  });

})