import * as dotenv from "dotenv";

dotenv.config();

const firebaseWebConfig = {
    apiKey: process.env.FIREBASE_apiKey || "fake",
    authDomain: process.env.FIREBASE_authDomain || "fake.firebaseapp.com",
    databaseURL:
        process.env.FIREBASE_databaseURL || "https://fake.firebaseio.com",
    projectId: process.env.FIREBASE_projectId || "fake",
    storageBucket: process.env.FIREBASE_storageBucket || "fake.appspot.com",
    messagingSenderId: process.env.FIREBASE_messagingSenderId || "123456",
    appId: process.env.FIREBASE_appId || "1:123456789012:web:123456789123",
    measurementId: process.env.FIREBASE_measurementId || "G-ABCDEFG",
};

// If the dynamic config (this file) returns a function, then the static config (app.json) will be passed to the function with ({ config }) => ({}). This can be used to mutate the static config values.
export default ({ config }) => {
    config.web.config.firebase = firebaseWebConfig;
    setSentrySourcemapConfig(config);
    config.extra.env = process.env.NODE_ENV || "dev";

    return config;
};

function setSentrySourcemapConfig(config) {
    const sentrySourceMapUpload = config.hooks.postPublish[0];
    if (sentrySourceMapUpload) {
        sentrySourceMapUpload.config = {
            organization: process.env.SENTRY_ORGANIZATION,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            // setCommits: true,
        };
    }
}
