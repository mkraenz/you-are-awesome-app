import { INetInfoChanged } from "../Actions";
import { IReduxStateInternetConnection } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

export const internetConnectedReducer = (
    state: IReduxStateInternetConnection = {
        connected: true, // by default we don't want to show the no connection notice
    },
    action: INetInfoChanged
): IReduxStateInternetConnection => {
    switch (action.type) {
        case ReduxAction.NetInfoChanged:
            return {
                ...state,
                connected: action.payload.connected,
            };
    }
    return state;
};
