describe("Login page", () => {
  before(() => {
    cy.log("COOKIE_NAME:", Cypress.env("COOKIE_NAME"));
    cy.visit("/")


  })
  it("Login with Google", () => {
    cy.loginByGoogleApi()

      .then(({ cookies }) => {
        // cy.clearCookies()

        // const cookie = cookies
        // cy.log(cookie)

        //   .filter((cookie) => cookie.name === Cypress.env("COOKIE_NAME"))
        //   .pop()
        // if (cookie) {
        //   cy.setCookie(cookie.name, cookie.value, {
        //     domain: cookie.domain,
        //     expiry: cookie.expires,
        //     httpOnly: cookie.httpOnly,
        //     path: cookie.path,
        //     secure: cookie.secure,
        //   })

        //   Cypress.Cookies.defaults({
        //     preserve: cookieName,
        //   })
        cy.visit("/account")

        // remove the two lines below if you need to stay logged in
        // for your remaining tests
        // cy.visit("/api/auth/signout")
        // cy.get("form").submit()
        // }
      })
  })
})