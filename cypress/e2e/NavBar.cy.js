// const { it } = require("node:test");

describe("Navigation", () => {
  beforeEach(() => {
    console.log('Current URL:', Cypress.config('baseUrl'));
    cy.visit("/");
    console.log('Visited URL:', Cypress.config('baseUrl'));
  });

  it("should navigate to all available pages", () => {

    cy.get('a[href*="aboutme"]').first().click();
    cy.url().should("include", "/aboutme");
    cy.get("h1").contains("Every Step of The Way!");
    cy.findByRole("link", { name: "Prices" }).click();
    cy.url().should("include", "/price");
    cy.get("h1").contains("Invest in Yourself");
    cy.findByRole("link", { name: "Feedbacks" }).click();
    cy.url().should("include", "/feedbacks");
    cy.get("h1").contains("What My Students Say");
    cy.findByRole("link", { name: "Free Courses" }).click();
    cy.url().should("include", "/courses");
    cy.get("h1").contains("The Best Time to Start Learning is Now!");
    cy.findByRole("link", { name: "Log In" }).click();
    cy.url().should("include", "/access");
    cy.get("input[type='email']").should('be.visible').should('have.attr', 'placeholder', 'Email');

  });
});

describe("Languages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display or hide the list of languages according to the toggle button and translate website correctly", () => {
    const languageToggle = cy.findByRole("button", {
      name: /Select a language/i,
    });

    languageToggle.should("exist");
    const japaneseLanguageButton = cy.findByText("Japanese");
    japaneseLanguageButton.should("not.exist");
    languageToggle.click();
    japaneseLanguageButton.should("exist");
    cy.findByRole("button", {
      name: /select Japanese language/i,
    }).click();
    cy.findByRole("link", { name: "フィードバック" }).should("be.visible");
    cy.findByRole("link", { name: "About Me" }).should("not.exist");
    cy.findByRole("button", {
      name: /select Japanese language/i,
    }).should("not.exist");
    cy.get("h1").contains("目標を達成しましょう！");
  });
});

describe("Currency", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display or hide a list of currencies according to the toggle button and display the correct value for the selected currency", () => {

    cy.intercept('GET', 'https://api.exchangerate.host/latest?base=USD', {
      statusCode: 200,
      body: {
        rates: {
          EUR: "0.9201956662563647",
          GBP: 0.7919550957455295,
          HKD: "7.8455566666666667",
          JPY: "146.237",
          KRW: "1321.2903993117096324",
          NZD: "1.6815523333333333",
          THB: "35.0862488866721536",
          TWD: "31.8690003007284841",
          USD: 1.0,
          INR: "82.6519893333333333",
          RUB: "95.4157823333333333",
          BRL: "4.8527333315015794",
          MXN: "16.7952719961277675"
        },
      },
    }).as('exchangeRateRequest');


    cy.findByRole("button", { name: "Toggle available currencies" }).contains("USD");


    cy.findAllByTestId("currency_rate").each(($element) => {
      cy.wrap($element).should('have.text', '5');
    });
    cy.findByText('Toggle available currencies').should('not.exist')
    cy.get(".Currency_currencyToggle__AZ3vm")
      .contains("USD")
      .should("not.contain", "GBP")
      .click();
    cy.findByRole("button", { name: /GBP/i }).click();
    cy.findAllByTestId("currency_code").each(($element) => {
      cy.wrap($element).should('have.text', 'GBP3.96');
    });
  });
});
