const js = require('@eslint/js');
const pluginReact = require('eslint-plugin-react');

module.exports = {
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      plugins: [js, pluginReact],
      extends: ['js/recommended', 'plugin:react/recommended'],
      rules: {
        // Add any custom rules if necessary
      },
      languageOptions: {
        globals: {
          React: 'writable', // Make sure React is treated as a global variable
        },
      },
    },
  ],
};
