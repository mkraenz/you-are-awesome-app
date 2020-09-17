import { CONFIG } from "../src/config";

if (!CONFIG.isProd) {
    process.exitCode = 1;
    throw new Error(
        "Assertion failed. CONFIG.isProd must be set to true for deployments."
    );
}
