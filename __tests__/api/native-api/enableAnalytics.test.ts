import { Analytics } from "../../../src/api/Analytics";
import { enableAnalytics } from "../../../src/api/native-api/enableAnalytics";

beforeEach(() => {
    jest.spyOn(Analytics, "logToggleAnalytics" as any).mockImplementation(() =>
        Promise.resolve()
    );
    jest.spyOn(
        Analytics,
        "setAnalyticsCollectionEnabled" as any
    ).mockImplementation(() => Promise.resolve());
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("logs that analytics have been reenabled and enables analytics", async () => {
    await enableAnalytics(true);

    expect(Analytics.logToggleAnalytics).toHaveBeenCalledWith(true);
    expect(Analytics.setAnalyticsCollectionEnabled).toHaveBeenCalledWith(true);
});

it("logs that analytics will be disabled and disables analytics", async () => {
    await enableAnalytics(false);

    expect(Analytics.logToggleAnalytics).toHaveBeenCalledWith(false);
    expect(Analytics.setAnalyticsCollectionEnabled).toHaveBeenCalledWith(false);
});
