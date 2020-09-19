import {
    analyticsEnabled,
    internetConnected,
    pushNotificationsEnabled,
} from "../../src/state/selectors";
import { Unpack } from "../../src/utils/ts/Unpack";

it("pushNotificationsEnabled returns the state", () => {
    const state: Unpack<Parameters<typeof pushNotificationsEnabled>> = {
        app: { pushNotificationsEnabled: true },
    };

    const result = pushNotificationsEnabled(state);

    expect(result).toBe(true);
});

it("internetConnected returns the state", () => {
    const state: Unpack<Parameters<typeof internetConnected>> = {
        network: { connected: true },
    };

    const result = internetConnected(state);

    expect(result).toBe(true);
});

it("analyticsEnabled returns the state", () => {
    const state: Unpack<Parameters<typeof analyticsEnabled>> = {
        app: { analyticsEnabled: true },
    };

    const result = analyticsEnabled(state);

    expect(result).toBe(true);
});
