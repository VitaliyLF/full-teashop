import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // запрещает расширяться интерфейсам в ts с пустым значением
      // '@typescript-eslint/no-empty-object-type': 'error',
      'no-console': 'warn',
      eqeqeq: 'warn',
      'no-else-return': 'warn',
      'no-var': 'warn',
      'no-await-in-loop': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'warn',
      camelcase: ['warn', { properties: 'never' }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
