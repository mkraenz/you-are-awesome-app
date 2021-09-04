import axios from "axios";
import { subscribeToPushNotifications } from "../../src/api/subscribeToPushNotifications";
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

it("puts in the correct format to subscribe-push-notification api", async () => {
    const putSpy = jest.spyOn(axios, "put").mockResolvedValue(undefined);

    const result = await subscribeToPushNotifications(new Date("2016-01-01"));

    expect(result).toEqual(undefined);
    expect(putSpy).toBeCalledWith(
        CONFIG.uri.subscribeToPushNotifications,
        { token: "mock-push-token-123", hour: 0, minute: 0 },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
});

it("fetches with time in UTC", async () => {
    const putSpy = jest.spyOn(axios, "put").mockResolvedValue(undefined);

    const result = await subscribeToPushNotifications(
        new Date("2020-08-26T13:32:00+05:30")
    );

    expect(result).toEqual(undefined);
    expect(putSpy).toBeCalledWith(
        CONFIG.uri.subscribeToPushNotifications,
        { token: "mock-push-token-123", hour: 13 - 5, minute: 32 - 30 },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
});
