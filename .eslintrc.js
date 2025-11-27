module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    // desactivamos todos los parsing errors de Vue
    'vue/no-parsing-error': 'off',

    // otras reglas existentes
    'func-names': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'dot-notation': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'linebreak-style': ["error", "windows"],
    'no-nested-ternary': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { code: 600 }],
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"]
    },
    ecmaFeatures: {
      jsx: true
    }
  }
};
