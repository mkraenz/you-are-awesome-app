import { ActionType } from "../../../src/state/actions/ActionType";
import { INetInfoChanged } from "../../../src/state/actions/INetworkAction";
import { networkReducer } from "../../../src/state/reducers/networkReducer";
import { INetworkState } from "../../../src/state/state/INetworkState";

describe("networkReducer", () => {
    it("should return the initial state", () => {
        // @ts-expect-error
        const result = networkReducer(undefined, {});

        const expected: INetworkState = {
            connected: true,
        };
        expect(result).toEqual(expected);
    });

    it("should set netInfo to true on connect", () => {
        const action: INetInfoChanged = {
            type: ActionType.NetInfoChanged,
            payload: { connected: true },
        };
        const state: INetworkState = {
            connected: false,
        };

        const result = networkReducer(state, action);

        const expected: INetworkState = {
            connected: true,
        };
        expect(result).toEqual(expected);
    });

    it("should set netInfo to false on disconnect", () => {
        const action: INetInfoChanged = {
            type: ActionType.NetInfoChanged,
            payload: { connected: false },
        };
        const state: INetworkState = {
            connected: true,
        };

        const result = networkReducer(state, action);

        const expected: INetworkState = {
            connected: false,
        };
        expect(result).toEqual(expected);
    });
});
