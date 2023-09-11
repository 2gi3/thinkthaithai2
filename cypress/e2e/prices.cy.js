describe('Successful payment', () => {
  let paidLessonsBefore
  let paidLessonsAfter

  const getPaidLessons = () => {

    return cy.request({
      method: 'GET',
      url: '/api/students?searchBy=email&value=gippolito@hotmail.co.uk',
    }).then((res) => res.body.paidLessons);

  };

  before(() => {

    paidLessonsBefore = getPaidLessons().then((countBefore) => {
      paidLessonsBefore = countBefore
    })

  })

  after(() => {

    getPaidLessons().then((countAfter) => {
      paidLessonsAfter = countAfter;
      expect(paidLessonsBefore).to.eq(paidLessonsAfter - 10);
      console.log({ 'paidLessonsAfter': paidLessonsAfter })
    })

  })

  it('Updates "paidLessons" in the database and redirects the student to /account', () => {

    cy.loginByGoogleApi().then(async () => {
      cy.visit('/price')
      cy.wait(2000)
      cy.get('.primaryButton').click()
    })

    console.log({ 'paidLessonsBefore': paidLessonsBefore })

    Cypress.on('uncaught:exception', () => false);

    cy.origin('https://checkout.stripe.com', () => {

      Cypress.on('uncaught:exception', () => false);

      cy.get('#cardNumber').type('4242424242424242')
      cy.get('#cardExpiry').type('1028')
      cy.get('#cardCvc').type('123')
      cy.get('#billingName').type('John Doe')
      cy.get('#billingPostalCode').type('NW2 4TX')
      cy.get('.SubmitButton-IconContainer').click()

    })

    cy.url({ timeout: 30000 }).should("include", "/account")

  })

})

describe("Trial lesson", () => {
  beforeEach(() => {
    cy.visit('/price')
  })

  afterEach(() => {
    cy.logOut()
      .then(() => {

        cy.wait(3000)
        cy.visit("/price")
        cy.get("h3").contains("No Commitment").should('be.visible')

      })
  })

  it("Is only available to new students", () => {

    cy.get("h3").contains("No Commitment").should('be.visible')
    cy.loginByGoogleApi()
      .then(() => {

        cy.visit("/price")
        cy.get("h3").contains("No Commitment").should('not.be.visible')

      })

  })
})

describe('Private lessons packages', () => {
  beforeEach(() => {
    cy.visit("/price");
    cy.wait(2000)
    cy.get('main > :nth-child(2)').as('fiveLessonsPackage');
    cy.get('main > :nth-child(3)').as('tenLessonsPackage');
    cy.get('main > :nth-child(4)').as('twentyLessonsPackage');
  });

  context('Package information display', () => {
    it('displays all packages with buttons and with the right prices', () => {
      cy.get('@tenLessonsPackage').should('contain', '10 lessons').and('contain', 'USD209').and('contain', 'Most Popular');
      cy.get('@fiveLessonsPackage').should('contain', '5 lessons').and('contain', 'USD109').and('contain', 'Try');
      cy.get('@twentyLessonsPackage').should('contain', '20 lessons').and('contain', 'USD380').and('contain', 'Commit');
    });
  });

  context('User authentication', () => {
    it('requires the student to log in to buy any lessons', () => {
      cy.get('@tenLessonsPackage').contains('10 lessons').click();
      cy.get("h2").contains("Please Log In first");
      cy.get('.alert_alertButton__mHffR').click();
      cy.url().should("include", "/access");
    });
  });
});

