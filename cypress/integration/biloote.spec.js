/// <reference types="cypress" />

// biloote.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

// https://on.cypress.io/writing-first-test
describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3333')
  })

  it('displays links for each rental types', () => {
    cy.get('a').should('have.length', 3)
  })

  it('displays rentals', () => {
    cy.get('tr').should('have.length', 4)
  })
})
