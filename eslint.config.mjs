// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
  // override the no-empty-pattern rule for framework files
  rules: {
    'no-empty-pattern': 'off'
  },
  files: ['framework/**/*.ts']
});
