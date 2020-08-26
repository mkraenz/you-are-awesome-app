import axios from "axios";
import { registerForPushNotifications } from "../../src/api/registerForPushNotifications";
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

describe("registerForPushNotifications", () => {
    it("posts in the correct format to register-push-notification api", async () => {
        const postSpy = jest.spyOn(axios, "post").mockResolvedValue(undefined);

        const result = await registerForPushNotifications(
            new Date("2016-01-01")
        );

        expect(result).toEqual(undefined);
        expect(postSpy).toBeCalledWith(
            URI.REGISTER_PUSH_NOTIFICATION,
            { token: "mock-push-token-123", hour: 0, minute: 0 },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    });

    it("fetches with time in UTC", async () => {
        const postSpy = jest.spyOn(axios, "post").mockResolvedValue(undefined);

        const result = await registerForPushNotifications(
            new Date("2020-08-26T13:32:00+05:30")
        );

        expect(result).toEqual(undefined);
        expect(postSpy).toBeCalledWith(
            URI.REGISTER_PUSH_NOTIFICATION,
            { token: "mock-push-token-123", hour: 13 - 5, minute: 2 },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
    });
});
