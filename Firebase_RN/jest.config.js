module.exports = {
  preset: 'react-native',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs|firebase)/)',
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // ✅ IMPORTANT
    '!src/**/*.d.ts',
    '!src/**/styles.ts',
    '!src/**/types/**',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
  ],

  coverageReporters: ['text', 'lcov'],
};
