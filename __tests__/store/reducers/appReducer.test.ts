import { Language } from "../../../src/localization/localization";
import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IChangePushNotificationTime,
    ISetLanguage,
    ISetPushNotificationsState,
    IToggleAnalytics,
    IToggleDarkThemeAction,
    IToggleOnboardingCompleted,
} from "../../../src/state/actions/IAppAction";
import { appReducer } from "../../../src/state/reducers/appReducer";
import { IAppState } from "../../../src/state/state/IAppState";

describe("appReducer()", () => {
    it("should return the initial state", () => {
        // @ts-expect-error
        const result = appReducer(undefined, {});

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ToggleDarkTheme} | dark mode on`, () => {
        const action: IToggleDarkThemeAction = {
            type: ActionType.ToggleDarkTheme,
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: true,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ToggleDarkTheme} | dark mode off`, () => {
        const action: IToggleDarkThemeAction = {
            type: ActionType.ToggleDarkTheme,
        };
        const state: IAppState = {
            isDarkModeOn: true,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.SetPushNotificationsState} | enable`, () => {
        const action: ISetPushNotificationsState = {
            type: ActionType.SetPushNotificationsState,
            payload: {
                enabled: true,
                scheduledTime: new Date("2016-01-01T15:36:01Z"),
            },
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: new Date("2016-01-01T15:36:01Z"),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.SetPushNotificationsState} | disable`, () => {
        const action: ISetPushNotificationsState = {
            type: ActionType.SetPushNotificationsState,
            payload: {
                enabled: false,
                scheduledTime: new Date("2016-01-01T15:36:01Z"),
            },
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: new Date("2016-01-01T15:36:01Z"),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date("2016-01-01T15:36:01Z"),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ChangePushNotificationTime}`, () => {
        const action: IChangePushNotificationTime = {
            type: ActionType.ChangePushNotificationTime,
            payload: {
                scheduledTime: new Date("2016"),
            },
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date("2016"),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.SetLanguage}`, () => {
        const action: ISetLanguage = {
            type: ActionType.SetLanguage,
            payload: {
                language: Language.English,
            },
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: Language.English,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ToggleAnalytics}`, () => {
        const action: IToggleAnalytics = {
            type: ActionType.ToggleAnalytics,
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            ...state,
            analyticsEnabled: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ToggleOnboardingCompleted}`, () => {
        const action: IToggleOnboardingCompleted = {
            type: ActionType.ToggleOnboardingCompleted,
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
            language: null,
            analyticsEnabled: true,
            onboardingCompleted: false,
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            ...state,
            analyticsEnabled: true,
            onboardingCompleted: true,
        };
        expect(result).toEqual(expected);
    });
});
