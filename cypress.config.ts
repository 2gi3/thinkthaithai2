import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // defaultCommandTimeout: 4000,
    baseUrl: process.env.NEXT_PUBLIC_BASIC_URL,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})