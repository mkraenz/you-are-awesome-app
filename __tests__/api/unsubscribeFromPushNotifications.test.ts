import axios from "axios";
import { unsubscribeFromPushNotifications } from "../../src/api/unsubscribeFromPushNotifications";
import { CONFIG } from "../../src/config";

jest.mock("expo-notifications", () => ({
    getExpoPushTokenAsync: () =>
        Promise.resolve({ data: "mock-push-token-123" }),
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("posts in the correct format to unsubscribe-push-notification api", async () => {
    const postSpy = jest.spyOn(axios, "post").mockResolvedValue(undefined);

    const result = await unsubscribeFromPushNotifications();

    expect(result).toEqual(undefined);
    expect(postSpy).toBeCalledWith(
        CONFIG.uri.unsubscribeFromPushNotifications,
        { token: "mock-push-token-123" },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
});
