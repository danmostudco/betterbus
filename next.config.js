const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
module.exports = withSass(
  withCSS({
    env: {
      WMATA_API_KEY: process.env.WMATA_API_KEY,
    },
  })
);
