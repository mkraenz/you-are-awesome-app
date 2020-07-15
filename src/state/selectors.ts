import { Pick2 } from "../utils/ts/Pick2";
import { IState } from "./state/IState";

export const backoffInMs = (
    state: Pick2<IState, "submitMessage", "backoffInMs">
) => state.submitMessage.backoffInMs;

export const pushNotificationsEnabled = (
    state: Pick2<IState, "app", "pushNotificationsEnabled">
) => state.app.pushNotificationsEnabled;

export const internetConnected = (
    state: Pick2<IState, "network", "connected">
) => state.network.connected;
