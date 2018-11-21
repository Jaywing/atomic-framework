module.exports = {
  tokens: {
    baseurl: "https://jaywing.github.io/atomic-framework"
  },

  SASS_PATHS: ["node_modules", "scss"],

  SASS_DOC_PATHS: ["node_modules", "scss", "docs/scss"],

  SASS_LINT_FILES: ["scss/**/*.scss"],

  CSS_COMPATIBILITY: [
    "last 2 versions",
    "ie >= 9",
    "Android >= 2.3",
    "ios >= 7"
  ]
};
