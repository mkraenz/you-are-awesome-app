// import * as Localization from "expo-localization";

export const languageDetector = {
    type: "languageDetector" as const,
    async: true, // flags below detection to be async
    detect: (callback: (locale: string) => void) => {
        // TODO expo 45
        // TypeError: (0, _expoModulesCore.requireNativeModule) is not a function. (In '(0, _expoModulesCore.requireNativeModule)('ExpoLocalization')', '(0, _expoModulesCore.requireNativeModule)' is undefined)
        // at node_modules/react-native/Libraries/Core/ExceptionsManager.js:95:4 in reportException
        // at node_modules/react-native/Libraries/Core/ExceptionsManager.js:141:19 in handleException
        // at node_modules/react-native/Libraries/Core/setUpErrorHandling.js:24:6 in handleError
        // at node_modules/@react-native/polyfills/error-guard.js:49:36 in ErrorUtils.reportFatalError
        // at node_modules/metro-runtime/src/polyfills/require.js:203:6 in guardedLoadModule
        // at http://192.168.1.178:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false&strict=false&minify=false:250126:3 in global code

        // callback(Localization.locale);
        callback("en-US");
    },
    init: () => {},
    cacheUserLanguage: () => {},
};
