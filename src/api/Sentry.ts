import * as Sentry from "sentry-expo";
import { CONFIG } from "../config";

export const initSentry = (cfg: typeof CONFIG.sentry, version: number) => {
    Sentry.init({
        dsn: cfg.dns,
        enableInExpoDevelopment: cfg.reportFromExpoClient,
        environment: cfg.environment,
        debug: cfg.debug, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
    });
    Sentry.Native.setTag("jsBuildVersion", version.toString());
};
