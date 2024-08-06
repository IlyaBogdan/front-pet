import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue",
    'ts',
    'node',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  rootDir: './',
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest/setup.ts']
};

export default config;