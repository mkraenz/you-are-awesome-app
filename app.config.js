import * as dotenv from "dotenv";
import firebaseWebConfig from "./google-firebase-web";

dotenv.config();

// If the dynamic config (this file) returns a function, then the static config (app.json) will be passed to the function with ({ config }) => ({}). This can be used to mutate the static config values.
export default ({ config }) => {
    config.web.config.firebase = firebaseWebConfig;
    // Sentry
    config.hooks.postPublish[0].config = {
        organization: process.env.SENTRY_ORGANIZATION,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        setCommits: true,
    };
    return config;
};
