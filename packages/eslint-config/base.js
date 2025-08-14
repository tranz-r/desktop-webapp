import js from '@eslint/js'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 */
export default tseslint.config(
  {
    ignores: ['dist/**', '.next/**', 'node_modules/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
)
