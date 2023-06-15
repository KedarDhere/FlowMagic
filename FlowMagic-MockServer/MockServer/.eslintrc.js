module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  plugins: ['jest'],
  extends: [
    'standard',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  }
}
