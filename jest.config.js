const expoPreset = require("jest-expo/jest-preset");
// const jestPreset = require("@testing-library/react-native/jest-preset");

module.exports = Object.assign(expoPreset, {
    setupFiles: [
        ...expoPreset.setupFiles,
        // ...jestPreset.setupFiles,
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js",
        "!**/mocks.ts",
    ],
    testPathIgnorePatterns: ["/node_modules/", "/__tests__/helpers/"],
});
