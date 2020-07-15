import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { INetworkAction } from "../actions/INetworkAction";
import { INetworkState } from "../state/INetworkState";

export const networkReducer: Reducer<INetworkState, INetworkAction> = (
    state = {
        connected: true,
    },
    action
) => {
    switch (action.type) {
        case ActionType.NetInfoChanged:
            return {
                ...state,
                connected: action.payload.connected,
            };
    }
    return state;
};
