import * as dotenv from "dotenv";
import firebaseWebConfig from "./google-firebase-web";

dotenv.config();

// If the dynamic config (this file) returns a function, then the static config (app.json) will be passed to the function with ({ config }) => ({}). This can be used to mutate the static config values.
export default ({ config }) => {
    config.web.config.firebase = firebaseWebConfig;
    setSentrySourcemapConfig(config);

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
