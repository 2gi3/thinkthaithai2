
describe("Trial lesson", () => {

  it("Is only available to new students", () => {

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

describe('Private lessons packages', () => {
  beforeEach(() => {
    cy.visit("/price")
    // cy.wait(2000)
    cy.get('main > :nth-child(2)').as('5Lessons');
    cy.get('main > :nth-child(3)').as('10Lessons');
    cy.get('main > :nth-child(4)').as('20Lessons');
  })


  it('displays all packages with buttons and with the right prices', () => {
    // cy.intercept('POST', '/api/payment', {
    //   url: 'https://checkout.stripe.com/c/pay/cs_test_a1rZOS8f6zDHVq4LXaFKTnIAASpTPVULxZuyp9t6cDYCE0B5hVlYmQGlRT#fidkdWxOYHwnPyd1blpxYHZxWjA0S2BMX0xAfUZcMWMyaUdxdXw0fzFybXU0bmpfMWxJQURqMkxESm9JbmZfPDR8S19wMUw8amFCd11HUFVycG01R3Zjb1VNd2d2TnxSYHduQUJqQXdXfGZoNTU0S2NsPUR3QycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
    // }).as('createCheckout');



    cy.get('@10Lessons').contains(/10 lessons/i);
    cy.get('@10Lessons').contains(/USD209/i);
    cy.get('@10Lessons').contains(/Most Popular/i);

    cy.get('@5Lessons').contains(/5 lessons/i);
    cy.get('@5Lessons').contains(/USD109/i);
    cy.get('@5Lessons').contains(/Try/i);

    cy.get('@20Lessons').contains(/20 lessons/i);
    cy.get('@20Lessons').contains(/USD380/i);
    cy.get('@20Lessons').contains(/Commit/i);

  })

  it('The student must log in to buy any lessons', () => {

    cy.get('@10Lessons').contains(/10 lessons/i).click()
    cy.get("h2").contains("Please Log In first");
    cy.get('.alert_alertButton__mHffR').click();
    cy.url().should("include", "/access");

  })

  it.only('Payments are completed successfully', () => {
    cy.loginByGoogleApi().then(() => {

      cy.visit('/price')
      cy.wait(2000)
      cy.get('.primaryButton').click()

    })


  })




})

