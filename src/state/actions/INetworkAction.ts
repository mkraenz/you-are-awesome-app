import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type INetworkAction = INetInfoChanged;

export type INetInfoChanged = IActionWithPayload<
    ActionType.NetInfoChanged,
    { connected: boolean }
>;
