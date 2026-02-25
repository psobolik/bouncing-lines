// @ts-check

import eslint from '@eslint/js';
import {defineConfig, globalIgnores} from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    [globalIgnores([
        'dist/**',
        'node_modules/**',
        'build/**',
        'tests/**', // Ignore tests folder
    ]),
    {
        files: ['src/**/*.ts'],
        rules: {
            // Your rules here
        },
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    ]
);