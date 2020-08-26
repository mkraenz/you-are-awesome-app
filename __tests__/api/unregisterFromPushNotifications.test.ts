import axios from "axios";
import { unregisterFromPushNotifications } from "../../src/api/unregisterFromPushNotifications";
import { URI } from "../../src/config";

jest.mock("expo-notifications", () => ({
    getExpoPushTokenAsync: () =>
        Promise.resolve({ data: "mock-push-token-123" }),
}));

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("unregisterForPushNotifications", () => {
    it("posts in the correct format to unregister-push-notification api", async () => {
        const postSpy = jest.spyOn(axios, "post").mockResolvedValue(undefined);

        const result = await unregisterFromPushNotifications();

        expect(result).toEqual(undefined);
        expect(postSpy).toBeCalledWith(
            URI.UNREGISTER_PUSH_NOTIFICATION,
            { token: "mock-push-token-123" },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    });
});
