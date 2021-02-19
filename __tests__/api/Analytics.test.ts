import * as FAnalytics from "expo-firebase-analytics";
import { Analytics } from "../../src/api/Analytics";
import { Language } from "../../src/localization/localization";
import { Route } from "../../src/navigation/Route";

jest.mock("expo-firebase-analytics", () => ({
    logEvent: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
    resetAnalyticsData: jest.fn(),
}));
jest.mock("../../src/config", () => ({
    CONFIG: {
        featureFlags: {
            analytics: true,
        },
    },
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("setAnalyticsCollectionEnabled() forwards to Firebase Analytics", async () => {
    await Analytics.setAnalyticsCollectionEnabled(true);
    expect(FAnalytics.setAnalyticsCollectionEnabled).toHaveBeenCalledWith(true);
});

it("resetAnalyticsData() forwards to Firebase Analytics", async () => {
    await Analytics.resetAnalyticsData();
    expect(FAnalytics.resetAnalyticsData).toHaveBeenCalled();
});

it("logToggleAnalytics() logs the correct toggle_analytics event", async () => {
    await Analytics.logToggleAnalytics(true);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("toggle_analytics", {
        enabled: true,
    });
});

it("logContribution()", async () => {
    await Analytics.logContribution(123);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("share", {
        type: "contribution",
        contributions: 123,
    });
});

it("logDebug()", async () => {
    await Analytics.logDebug();
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("debug", {
        debugProps1: 123,
        debugProp2: "hallo",
    });
});

it("logButtonPress()", async () => {
    await Analytics.logButtonPress("my-type", { someProp: "hey" });
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "my-type",
        someProp: "hey",
    });
});

it("logLike()", async () => {
    await Analytics.logLike("some-message-id-123");
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "like",
        messageId: "some-message-id-123",
    });
});

it("logDarkMode()", async () => {
    await Analytics.logDarkMode(true);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "dark_mode",
        enabled: true,
    });
});

it("logFormPartiallyFilled()", async () => {
    await Analytics.logFormPartiallyFilled("contributions", 2);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("form_fill", {
        formName: "contributions",
        otherFormLinesFilled: 2,
    });
});

it("logPushNotifications()", async () => {
    await Analytics.logPushNotifications(false, 16, 43, "Europe/Berlin");
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "push_notifications",
        enabled: false,
        hour: 16,
        min: 43,
        timezone: "Europe/Berlin",
    });
});

it("logLinkFollow()", async () => {
    await Analytics.logLinkFollow("company");
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("link_follow", {
        linkText: "company",
    });
});

it("logDelete()", async () => {
    await Analytics.logDelete(10, 0, Route.Favorites);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "items_deleted",
        itemsDeleted: 10,
        itemsLeft: 0,
        deletedAll: true,
        screen: Route.Favorites,
    });
});

it("logDeleteMode()", async () => {
    await Analytics.logDeleteMode(Route.Favorites);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "delete_mode",
        screen: Route.Favorites,
    });
});

it("logCancel()", async () => {
    await Analytics.logCancel("delete own contributions");
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "cancel",
        purpose: "delete own contributions",
    });
});

it("logLanguage()", async () => {
    await Analytics.logLanguage(Language.German);
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "language",
        language: "de",
    });
});

it("logManualRefresh()", async () => {
    await Analytics.logManualRefresh();
    expect(FAnalytics.logEvent).toHaveBeenCalledWith("button_press", {
        type: "refresh",
    });
});
