import baseConfig from './base.js'

/**
 * A shared ESLint configuration for Next.js applications.
 */
export default [
  ...baseConfig,
  {
    extends: ['next/core-web-vitals'],
    rules: {
      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]
