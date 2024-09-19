import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    // '^.+\\.tsx?$': [
    //   'ts-jest',
    //   {
    //     useESM: true,
    //   },
    // ],
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1', // Mapea el alias '@/' a la carpeta 'src'
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  // setupFiles: ['<rootDir>/setupTests.ts'],
};

export default config;
