import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

import tsParser from '@typescript-eslint/parser';
import eslintAirbnb from 'eslint-config-airbnb-base';
import prettierConfig from 'eslint-config-prettier';

import importPlugin from 'eslint-plugin-import';

import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/__snapshots__',
      '.github',
      'build',
      'data',
      'public',
      '**/__testfixtures__',
      '**/eslint.config.js',
      '**/prettier.config.js',
      '**/rspackx.ts',
    ],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierConfig,
      '@typescript-eslint': typescriptEslintPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      'no-only-tests': noOnlyTestsPlugin,
    },
    rules: {
      ...eslintAirbnb.rules,
      quotes: [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
      'no-mixed-operators': 0,
      'global-require': 0,
      'no-console': 2,
      'no-undef': 2,
      'max-len': [1, 180, 2],
      'no-param-reassign': [2, { props: false }],
      'no-continue': 0,
      'no-underscore-dangle': 0,
      'generator-star-spacing': 0,
      'no-duplicate-imports': 0,
      'no-use-before-define': 0,
      'consistent-return': 0,
      'spaced-comment': 0,
      'arrow-parens': 0,
      'import/first': 1,
      'no-return-await': 0,
      'import/namespace': [2, { allowComputed: true }],
      'import/no-duplicates': 1,
      'import/order': [
        2,
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@woovi/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'no-await-in-loop': 0,
      'no-plusplus': 0,
      'import/prefer-default-export': 0,
      'no-confusing-arrow': 0,
      'no-bitwise': 0,
      'function-paren-newline': 0,
      'object-curly-newline': 0,
      curly: [2, 'all'],
      'import/no-cycle': 1,
      'import/no-unresolved': [
        2,
        { ignore: ['@entria/graphql-mongoose-loader'] },
      ],
      'import/no-self-import': 1,
      indent: 0,
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/camelcase': 0,
      camelcase: 0,
      'interface-over-type-literal': 0,
      '@typescript-eslint/consistent-type-definitions': 0,
      'lines-between-class-members': 0,
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/prefer-interface': 0,
      '@typescript-eslint/interface-name-prefix': 0,
      '@typescript-eslint/no-non-null-assertion': 1,
      '@typescript-eslint/no-var-requires': 1,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': [
        'error',
        {
          allowHigherOrderFunctions: true,
        },
      ],
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': 2,
      'import/no-extraneous-dependencies': 2,
      'testing-library/no-dom-import': 0,
      'prefer-const': [
        2,
        {
          destructuring: 'all',
        },
      ],
      'no-multi-assign': 1,
      'prefer-destructuring': 0,
      'no-only-tests/no-only-tests': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@woovi/**/src',
            'graphql-relay/index',
            'graphql/index',
            'moment/moment',
            'scripts',
          ],
        },
      ],
      'import/extensions': [
        'error',
        {
          ts: 'always',
          tsx: 'always',
          js: 'always',
          jsx: 'always',
          mjs: 'always',
        },
      ],
      'no-multiple-empty-lines': 2,
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
      ],
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
