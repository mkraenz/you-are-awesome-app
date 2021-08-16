import { Language } from "../../src/localization/localization";
import {
    analyticsEnabled,
    countMyContributions,
    darkModeEnabled,
    internetConnected,
    language,
    onboardingCompleted,
    pushNotificationsEnabled,
} from "../../src/state/selectors";
import { Unpack } from "../../src/utils/ts/Unpack";
import { mock } from "../helpers/mocks";

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

it("countMyContributions returns the number of my contributions since the last app data resets ", () => {
    const state: Unpack<Parameters<typeof countMyContributions>> = {
        contributions: {
            myMessages: [mock.message, mock.message, mock.message],
        },
    };

    const result = countMyContributions(state);

    expect(result).toBe(3);
});

it("darkModeEnabled returns the state ", () => {
    const state: Unpack<Parameters<typeof darkModeEnabled>> = {
        app: { isDarkModeOn: true },
    };

    const result = darkModeEnabled(state);

    expect(result).toBe(true);
});

it("onboardingCompleted returns the state ", () => {
    const state: Unpack<Parameters<typeof onboardingCompleted>> = {
        app: { onboardingCompleted: true },
    };

    const result = onboardingCompleted(state);

    expect(result).toBe(true);
});

it("language returns the state ", () => {
    const state: Unpack<Parameters<typeof language>> = {
        app: { language: Language.Japanese },
    };

    const result = language(state);

    expect(result).toBe("ja");
});
