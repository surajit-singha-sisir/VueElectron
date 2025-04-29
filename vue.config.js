// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // This will automatically inject `onumna.scss` into all SCSS files in Vue components
        additionalData: `@import "~@/assets/styles/onumna.css";`,
      },
    },
  },
};
