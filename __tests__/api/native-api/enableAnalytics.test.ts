import * as Analytics from "expo-firebase-analytics";
import { enableAnalytics } from "../../../src/api/native-api/enableAnalytics";

jest.mock("expo-firebase-analytics", () => ({
    logEvent: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("logs that analytics have been reenabled and enables analytics", async () => {
    await enableAnalytics(true);

    expect(Analytics.logEvent).toHaveBeenCalledWith("toggle_analytics", {
        enabled: true,
    });
    expect(Analytics.setAnalyticsCollectionEnabled).toHaveBeenCalledWith(true);
});

it("logs that analytics will be disabled and disables analytics", async () => {
    jest.mock("expo-firebase-analytics", () => ({
        logEvent: jest.fn(),
        setAnalyticsCollectionEnabled: jest.fn(),
    }));

    await enableAnalytics(false);

    expect(Analytics.logEvent).toHaveBeenCalledWith("toggle_analytics", {
        enabled: false,
    });
    expect(Analytics.setAnalyticsCollectionEnabled).toHaveBeenCalledWith(false);
});
