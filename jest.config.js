const expoPreset = require("jest-expo/jest-preset");

module.exports = Object.assign(expoPreset, {
    setupFiles: [...expoPreset.setupFiles],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-permissions-interface/.*|sentry-expo|native-base)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js",
        "!**/mocks.ts",
        "!./src/utils/ts/*.ts",
    ],
    coverageReporters: ["text", "lcov"],
    testPathIgnorePatterns: ["/node_modules/", "/__tests__/helpers/"],
});
