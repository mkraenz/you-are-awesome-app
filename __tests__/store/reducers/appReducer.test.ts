import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IChangePushNotificationTime,
    IReadSettingsSucceeded,
    ISetPushNotificationsState,
    IToggleDarkThemeAction,
} from "../../../src/state/actions/IAppAction";
import { appReducer } from "../../../src/state/reducers/appReducer";
import { IAppState } from "../../../src/state/state/IAppState";

describe("appReducer()", () => {
    it("should return the initial state", () => {
        const result = appReducer(undefined, {} as any);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
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
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: true,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
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
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
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
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: new Date("2016-01-01T15:36:01Z"),
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
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date("2016-01-01T15:36:01Z"),
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.ReadSettingsSucceeded}`, () => {
        const action: IReadSettingsSucceeded = {
            type: ActionType.ReadSettingsSucceeded,
            payload: {
                enabled: true,
                scheduledTime: new Date("2016"),
            },
        };
        const state: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date(0),
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: true,
            pushNotificationsScheduledTime: new Date("2016"),
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
        };

        const result = appReducer(state, action);

        const expected: IAppState = {
            isDarkModeOn: false,
            pushNotificationsEnabled: false,
            pushNotificationsScheduledTime: new Date("2016"),
        };
        expect(result).toEqual(expected);
    });
});
