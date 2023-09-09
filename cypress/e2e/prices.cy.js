
describe("Login page", () => {
  // before(() => {
  //   cy.visit("/price")


  // })
  it("Trial lesson is only available to new students", () => {

    cy.visit('/price')
    cy.get("h3").contains("No Commitment").should('be.visible')
    cy.loginByGoogleApi()

      .then(() => {

        cy.visit("/price")
        cy.get("h3").contains("No Commitment").should('not.be.visible')

      })

    cy.logOut()
      .then(() => {

        cy.wait(3000)
        cy.visit("/price")
        cy.get("h3").contains("No Commitment").should('be.visible')

      })


  })
})


