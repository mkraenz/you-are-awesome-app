import { INetInfoChanged } from "../../../src/redux/Actions";
import { IReduxStateInternetConnection } from "../../../src/redux/IReduxState";
import { internetConnectedReducer } from "../../../src/redux/reducers/internetConnectedReducer";
import { ReduxAction } from "../../../src/redux/ReduxAction";

describe("postReducer", () => {
    it("should return the initial state", () => {
        const result = internetConnectedReducer(undefined, {} as any);

        const expected: IReduxStateInternetConnection = {
            connected: true,
        };
        expect(result).toEqual(expected);
    });

    it("should set netInfo to true on connect", () => {
        const action: INetInfoChanged = {
            type: ReduxAction.NetInfoChanged,
            payload: { connected: true },
        };
        const state: IReduxStateInternetConnection = {
            connected: false,
        };

        const result = internetConnectedReducer(state, action);

        const expected: IReduxStateInternetConnection = {
            connected: true,
        };
        expect(result).toEqual(expected);
    });

    it("should set netInfo to false on disconnect", () => {
        const action: INetInfoChanged = {
            type: ReduxAction.NetInfoChanged,
            payload: { connected: false },
        };
        const state: IReduxStateInternetConnection = {
            connected: true,
        };

        const result = internetConnectedReducer(state, action);

        const expected: IReduxStateInternetConnection = {
            connected: false,
        };
        expect(result).toEqual(expected);
    });
});
