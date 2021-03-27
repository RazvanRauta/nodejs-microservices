module.exports = {
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!<rootDir>/src/test/**',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '<rootDir>/src/test/',
    ],
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}
