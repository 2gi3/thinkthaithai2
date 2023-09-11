
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

})

describe('Successful payment', () => {
  let paidLessonsBefore
  let paidLessonsAfter


  before(() => {
    paidLessonsBefore = cy.request({
      method: 'GET',
      url: '/api/students?searchBy=email&value=gippolito@hotmail.co.uk',
    }).then((res) => {
      paidLessonsBefore = res.body.paidLessons
    })
  })
  after(() => {
    paidLessonsAfter = cy.request({
      method: 'GET',
      url: '/api/students?searchBy=email&value=gippolito@hotmail.co.uk',
    }).then((res) => {
      paidLessonsAfter = res.body.paidLessons;
      expect(paidLessonsBefore).to.eq(paidLessonsAfter - 10);
      console.log({ 'paidLessonsAfter': paidLessonsAfter })
    })

  })
  beforeEach(() => {
    cy.visit("/price")
  })

  it('Updates "paidLessons" in the database and redirects the student to /account', () => {

    cy.loginByGoogleApi().then(async () => {
      cy.visit('/price')
      cy.wait(2000)
      cy.get('.primaryButton').click()
    })
    console.log({ 'paidLessonsBefore': paidLessonsBefore })

    cy.on('uncaught:exception', (e) => {
      return false
    })
    cy.origin('https://checkout.stripe.com', () => {

      cy.get('#cardNumber').type('4242424242424242')
      cy.on('uncaught:exception', (e) => {
        return false
      })
      cy.get('#cardExpiry').type('1028')
      cy.on('uncaught:exception', (e) => {
        return false
      })
      cy.get('#cardCvc').type('123')
      cy.on('uncaught:exception', (e) => {
        return false
      })
      cy.get('#billingName').type('John Doe')
      cy.on('uncaught:exception', (e) => {
        return false
      })
      cy.get('#billingPostalCode').type('NW2 4TX')
      cy.on('uncaught:exception', (e) => {
        return false
      })
      cy.get('.SubmitButton-IconContainer').click()
      cy.on('uncaught:exception', (e) => {
        return false
      })

    })

    cy.url({ timeout: 30000 }).should("include", "/account")

  })

})