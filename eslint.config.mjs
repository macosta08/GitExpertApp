/* eslint-disable no-undef */
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import parser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist', 'eslint.config.mjs', 'jest.config.js', 'vite.config.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node, // Añadir las variables globales de Node.js
        ...globals.jest, // Agregar esta línea para que ESLint reconozca Jest
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.eslint.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      'jsx-a11y': jsxA11y, // Añade el plugin de accesibilidad
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'error', // Ejemplo de regla de accesibilidad
      'jsx-a11y/alt-text': 'error', // Asegura que las imágenes tengan texto alternativo
      'jsx-a11y/label-has-associated-control': 'error', // Verifica que los elementos <label> tengan un control asociado (for o un control hijo)
      'jsx-a11y/no-static-element-interactions': 'error', // Evita que los elementos no interactivos tengan handlers de eventos de mouse/teclado.
      'jsx-a11y/control-has-associated-label': 'error', // para describir su propósito
      'prettier/prettier': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  prettierConfig,
];
