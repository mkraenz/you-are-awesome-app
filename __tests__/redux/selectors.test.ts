import {
    backoffInMs,
    connectedToInternet,
    pushNotificationsEnabled,
} from "../../src/redux/selectors";

it("backoffInMs returns backoff", () => {
    const state = {
        networking: { backoffInMs: 1337 },
    };

    const result = backoffInMs(state);

    expect(result).toBe(1337);
});

it("connectedToInternet returns whether internet connection exists", () => {
    const state = {
        netInfo: { connected: false },
    };

    const result = connectedToInternet(state);

    expect(result).toEqual(false);
});

it("pushNotificationsEnabled returns whether push notifications are enabled", () => {
    const state = {
        settings: { notificationsEnabled: false },
    };

    const result = pushNotificationsEnabled(state);

    expect(result).toEqual(false);
});
