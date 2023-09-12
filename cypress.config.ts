import { defineConfig } from 'cypress'
const { GoogleSocialLogin } = require("cypress-social-logins").plugins


export default defineConfig({
  projectId: 'gsku38',
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'ThinkThaiThai Tests Report',
    embeddedScreenshots: true,
    inlineAssets: true
    // saveAllAttempts: false,
  },
  e2e: {
    // defaultCommandTimeout: 4000,
    // baseUrl: process.env.NEXT_PUBLIC_BASIC_URL,
    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
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
  experimentalModifyObstructiveThirdPartyCode: true
})