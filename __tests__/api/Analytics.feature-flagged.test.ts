import * as FAnalytics from "expo-firebase-analytics";
import { Analytics } from "../../src/api/Analytics";

jest.mock("expo-firebase-analytics", () => ({
    logEvent: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
    resetAnalyticsData: jest.fn(),
}));

jest.mock("../../src/config", () => ({
    CONFIG: {
        featureFlags: {
            analytics: false,
        },
    },
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("Analytics does nothing if feature flag not set", () => {
    it("setAnalyticsCollectionEnabled()", async () => {
        await Analytics.setAnalyticsCollectionEnabled(true);
        expect(FAnalytics.setAnalyticsCollectionEnabled).not.toHaveBeenCalled();
    });

    it("resetAnalyticsData()", async () => {
        await Analytics.resetAnalyticsData();
        expect(FAnalytics.resetAnalyticsData).not.toHaveBeenCalled();
    });

    it("logToggleAnalytics()", async () => {
        await Analytics.logToggleAnalytics(true);
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });

    it("logContribution()", async () => {
        await Analytics.logContribution(123);
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });

    it("logDebug()", async () => {
        await Analytics.logDebug();
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });

    it("logButtonPress()", async () => {
        await Analytics.logButtonPress("my-type", { someProp: "hey" });
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });

    it("logFormPartiallyFilled()", async () => {
        await Analytics.logFormPartiallyFilled("my form", 1);
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });

    it("logLinkFollow()", async () => {
        await Analytics.logLinkFollow("company");
        expect(FAnalytics.logEvent).not.toHaveBeenCalled();
    });
});
