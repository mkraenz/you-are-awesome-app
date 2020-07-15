import { ActionType } from "../actions/ActionType";
import { INetInfoChanged } from "../actions/INetworkAction";

export const changeNetInfo = (connected: boolean): INetInfoChanged => ({
    type: ActionType.NetInfoChanged,
    payload: { connected },
});
