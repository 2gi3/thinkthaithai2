// const { it } = require("node:test");

describe("Navigation", () => {
  beforeEach(() => {
    console.log('Current URL:', Cypress.config('baseUrl'));
    cy.visit("/");
    console.log('Visited URL:', Cypress.config('baseUrl'));
  });

  it("should navigate to all available pages", () => {
    // cy.findByRole("link", { name: "About Me" }).first().click();
    // cy.url().should("include", "/aboutme");
    // cy.get("h1").contains("I'm Natt");
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

  it("Should display or hide a list of currencies according to the toggle button", () => {
    cy.findByRole("button", { name: "Toggle available currencies" }).contains("USD");

    // cy.findByTestId("currency_code").contains("USD");
    cy.findAllByTestId("currency_rate").should($element => {
      // Use a custom assertion to retry until the element has the expected value
      expect($element).to.have.text("5");
    });
    // // cy.findByText('Toggle available currencies').should('not.exist')
    // cy.get(".Currency_currencyToggle__AZ3vm")
    //   .contains("USD")
    //   .should("not.contain", "GBP")
    //   .click();
    // cy.findByRole("button", { name: /GBP/i }).click();
    // cy.findByTestId("currency_code").contains("GBP");
    // cy.findByTestId("currency_rate").should("have.text", "4.44");
  });
});
