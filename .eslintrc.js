module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: false,
    jest: true,
    jasmine: true,
  },

  ignorePatterns: ['test/*', 'dist/*', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2018',
    project: 'tsconfig.json',
  },
  plugins: ['prefer-arrow', 'import', '@typescript-eslint'],
};
