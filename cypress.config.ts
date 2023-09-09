import { defineConfig } from 'cypress'
const { GoogleSocialLogin } = require("cypress-social-logins").plugins


export default defineConfig({
  e2e: {
    // defaultCommandTimeout: 4000,
    // baseUrl: process.env.NEXT_PUBLIC_BASIC_URL,
    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // on("task", {
      //   GoogleSocialLogin: GoogleSocialLogin,
      // })
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})