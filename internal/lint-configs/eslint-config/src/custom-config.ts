import type { Linter } from 'eslint';

const restrictedImportIgnores = [
  '**/vite.config.mts',
  '**/tailwind.config.mjs',
  '**/postcss.config.mjs',
];

const customConfig: Linter.Config[] = [
  {
    files: ['packages/effects/**/**', 'packages/types/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'perfectionist/sort-interfaces': 'off',
    },
  },
  {
    // apps内部的一些基础规则
    files: ['apps/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#/api/*'],
              message:
                'The #/api package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/layouts/*'],
              message:
                'The #/layouts package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/locales/*'],
              message:
                'The #/locales package cannot be imported, please use the @core package itself',
            },
            {
              group: ['#/stores/*'],
              message:
                'The #/stores package cannot be imported, please use the @core package itself',
            },
          ],
        },
      ],
      'perfectionist/sort-interfaces': 'off',
    },
  },
  {
    // @core内部组件，不能引入@admin/* 里面的包
    files: ['packages/@core/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@admin/*'],
              message:
                'The @core package cannot import the @admin package, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  {
    // @core/shared内部组件，不能引入@admin/* 或者 @admin-core/* 里面的包
    files: ['packages/@core/base/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@admin/*', '@admin-core/*'],
              message:
                'The @admin-core/shared package cannot import the @admin package, please use the @core/shared package itself',
            },
          ],
        },
      ],
    },
  },
  {
    // 不能引入@admin/*里面的包
    files: [
      'packages/types/**/**',
      'packages/utils/**/**',
      'packages/icons/**/**',
      'packages/constants/**/**',
      'packages/styles/**/**',
      'packages/stores/**/**',
      'packages/preferences/**/**',
      'packages/locales/**/**',
    ],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@admin/*'],
              message:
                'The @admin package cannot be imported, please use the @core package itself',
            },
          ],
        },
      ],
    },
  },
  // 后端模拟代码，不需要太多规则
  {
    files: ['apps/backend-mock/**/**', 'docs/**/**'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      'n/no-extraneous-import': 'off',
      'n/prefer-global/buffer': 'off',
      'n/prefer-global/process': 'off',
      'no-console': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['internal/**/**'],
    rules: {
      'no-console': 'off',
    },
  },
];

export { customConfig };