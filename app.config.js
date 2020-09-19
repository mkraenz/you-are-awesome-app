import firebaseWebConfig from "./google-firebase-web";

// If the dynamic config (this file) returns a function, then the static config (app.json) will be passed to the function with ({ config }) => ({}). This can be used to mutate the static config values.
export default ({ config }) => {
    config.web.config.firebase = firebaseWebConfig;
    return config;
};
