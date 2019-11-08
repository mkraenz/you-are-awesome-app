import {
    IReadSettingsSucceeded,
    ISetNotificationsState,
} from "../../../src/redux/Actions";
import { IReduxStateSettings } from "../../../src/redux/IReduxState";
import { settingsReducer } from "../../../src/redux/reducers/settingsReducer";
import { ReduxAction } from "../../../src/redux/ReduxAction";

describe("settingsReducer", () => {
    it("should return the initial state", () => {
        const result = settingsReducer(undefined, {} as any);

        const expected: IReduxStateSettings = {
            notificationsEnabled: false,
            scheduledTime: new Date(0),
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ReduxAction.SetNotificationsState}`, () => {
        const action: ISetNotificationsState = {
            type: ReduxAction.SetNotificationsState,
            payload: {
                enabled: true,
                scheduledTime: new Date("2016"),
            },
        };
        const state: IReduxStateSettings = {
            notificationsEnabled: false,
            scheduledTime: null,
        };

        const result = settingsReducer(state, action);

        const expected: IReduxStateSettings = {
            notificationsEnabled: true,
            scheduledTime: action.payload.scheduledTime,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ReduxAction.ReadSettingsSucceeded}`, () => {
        const action: IReadSettingsSucceeded = {
            type: ReduxAction.ReadSettingsSucceeded,
            payload: {
                enabled: true,
                scheduledTime: new Date("2016"),
            },
        };
        const state: IReduxStateSettings = {
            notificationsEnabled: false,
            scheduledTime: null,
        };

        const result = settingsReducer(state, action);

        const expected: IReduxStateSettings = {
            notificationsEnabled: true,
            scheduledTime: action.payload.scheduledTime,
        };
        expect(result).toEqual(expected);
    });
});
