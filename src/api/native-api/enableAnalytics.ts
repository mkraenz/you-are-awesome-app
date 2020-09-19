import * as Analytics from "expo-firebase-analytics";

export const enableAnalytics = async (shouldBeEnabled: boolean) => {
    const disableRequested = !shouldBeEnabled;
    if (disableRequested) {
        await Analytics.logEvent("toggle_analytics", { enabled: false });
    }

    await Analytics.setAnalyticsCollectionEnabled(shouldBeEnabled);

    if (shouldBeEnabled) {
        await Analytics.logEvent("toggle_analytics", { enabled: true });
    }
};
