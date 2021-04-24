module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    indent: ['error', 2],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    semi: ['error', 'always'],
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'off',
    'import/absolute-first': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
