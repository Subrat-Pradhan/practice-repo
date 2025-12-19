const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress-learning/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress-learning/support/e2e.js",
    fixturesFolder: "cypress-learning/fixtures",
    videosFolder: "cypress-learning/videos",
    screenshotsFolder: "cypress-learning/screenshots",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
