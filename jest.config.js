const expoPreset = require("jest-expo/jest-preset");

process.env.TZ = "Europe/Berlin";

module.exports = Object.assign(expoPreset, {
    setupFiles: [...expoPreset.setupFiles, "./__mocks__/mocks.js"],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-permissions-interface/.*|@sentry/.*|sentry-expo|native-base)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!./scripts/**/*.{ts,tsx}",
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
