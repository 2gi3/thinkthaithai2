// const { it } = require("node:test");

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to all available pages", () => {
    cy.findByRole("link", { name: "About Me" }).click();
    cy.url().should("include", "/aboutme");
    cy.get("h1").contains("I'm Natt");
    cy.findByRole("link", { name: "price" }).click();
    cy.url().should("include", "/price");
    cy.get("h1").contains("Invest in Yourself");
    cy.findByRole("link", { name: "feedbacks" }).click();
    cy.url().should("include", "/feedbacks");
    cy.get("h1").contains("What My Students Say");
    cy.findByRole("link", { name: "free courses" }).click();
    cy.url().should("include", "/courses");
    cy.get("h1").contains("The best time to start learning is Now!");
    cy.findByRole("link", { name: "log in" }).click();
    cy.url().should("include", "/access");
    cy.get("h1").contains("Log In");
  });
});

// describe("Languages", () => {
//     beforeEach(() => {
//       cy.visit("/");
//     });

//     it("Should display or hide a list of languages according to the toggle button", () => {

//     });
//     it("Should change the website language to the selected one", () => {

//     });
//   });

// describe("Currency", () => {
//     beforeEach(() => {
//       cy.visit("/");
//     });

//     it("Should display or hide a list of currencies according to the toggle button", () => {

//     });
//     it("Should display the correct price in the selected currency", () => {

//     });
//   });
