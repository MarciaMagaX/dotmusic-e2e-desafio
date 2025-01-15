const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rd383y",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://dotmusic.vercel.app',
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
