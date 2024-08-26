/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'jsdom', // Cambiar node  a 'jsdom'
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
