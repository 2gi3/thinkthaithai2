const { createYield } = require("typescript");

describe("Home page renders and works correctly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display all elements in the header", () => {
    // cy.findByRole("link", { name: "About Me" }).should("be.visible");
    cy.get("h1").contains("Reach Your Goals!");
  });
});
// it("should display the correct average ticket value", () => {
//   cy.findByText("Average Ticket Value").should("exist");
//   cy.findByText("2333.33").should("exist");

//   cy.findByText(/2000/i)
//     .should("exist")
//     .should(($el) => {
//       const color = $el.css("color");
//       expect(color).to.equal("rgb(34, 197, 94)");
//     });
// });

// it("should display the correct values for the default pair", () => {
//   cy.findByRole("button", { name: "BTC/USD" }).should("be.visible");
//   cy.findByRole("button", { name: "BTC/GBP" }).should("be.visible");
//   cy.get(".w-60 > :nth-child(4)")
//     .should("contain", "open")
//     .should("contain", 27820);
// });

// it("should filter the buttons correctly and display only the correct values of any selected pair", () => {
//   cy.findByLabelText("Find a specific pair").type("BTC/EUR");
//   cy.findByRole("button", { name: "BTC/USD" }).should("not.exist");
//   cy.findByRole("button", { name: "BTC/GBP" }).should("not.exist");
//   cy.findByRole("button", { name: "BTC/EUR" }).click();
//   cy.get(".w-60 > :nth-child(4)")
//     .should("contain", "open")
//     .should("contain", 25497);
//   cy.findByText(/2000/i).should("not.exist");
//   cy.findByText(/25666/i)
//     .first()
//     .should("exist")
//     .should(($el) => {
//       const color = $el.css("color");
//       expect(color).to.equal("rgb(239, 68, 68)");
//     });
// });

// it("Should display the biggest movers chart with the correct values, bar sizes and colors", () => {
//   cy.wait(20000);

//   cy.get('g[transform="translate(42.85714285714286, 80.48)"] rect')
//     .first()
//     .contains("BTC/PAX")
//     .should(($el) => {
//       const width = parseFloat($el.css("width"));
//       expect(width).to.be.within(43, 45);
//     })
//     .should("have.css", "fill", "rgb(0, 219, 6)")
//     .should(($el) => {
//       const height = parseFloat($el.css("height"));
//       expect(height).to.be.within(94, 96);
//     });

//   cy.get('g[transform="translate(128.57142857142856, 128.6)"] rect')
//     .first()
//     .should(($el) => {
//       const width = parseFloat($el.css("width"));
//       expect(width).to.be.within(43, 45);
//     })
//     .should("have.css", "fill", "rgb(240, 11, 0)")
//     .should(($el) => {
//       const height = parseFloat($el.css("height"));
//       expect(height).to.be.within(46, 48);
//     });
// });
