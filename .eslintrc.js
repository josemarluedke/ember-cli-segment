module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['ember', 'prettier'],
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'prettier/prettier': ['error']
  },
  overrides: [
    // node files
    {
      files: [
        'server/**/.js',
        'index.js',
        'ember-cli-build.js',
        'testem.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'no-unused-vars': 'off'
      }
    }
  ]
};
