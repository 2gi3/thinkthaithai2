describe("Login page", () => {
  before(() => {

    cy.log("COOKIE_NAME:", Cypress.env("COOKIE_NAME"));
    cy.visit("/")


  })
  it("Login with Google", () => {
    cy.loginByGoogleApi()

      .then(() => {


        cy.visit("/account")

      })
  })
})