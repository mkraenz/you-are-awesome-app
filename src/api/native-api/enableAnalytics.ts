import { Analytics } from "../Analytics";

export const enableAnalytics = async (shouldBeEnabled: boolean) => {
    const disableRequested = !shouldBeEnabled;
    if (disableRequested) {
        await Analytics.logToggleAnalytics(false);
    }

    await Analytics.setAnalyticsCollectionEnabled(shouldBeEnabled);

    if (shouldBeEnabled) {
        await Analytics.logToggleAnalytics(true);
    }
};
