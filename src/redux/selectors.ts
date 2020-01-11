import { Pick2 } from "../typescript/Pick2";
import { getFuturePosts } from "../utils/getFuturePosts";
import { IReduxState } from "./IReduxState";

export const backoffInMs = (state: Pick<IReduxState, "networking">) =>
    state.networking.backoffInMs;

export const futurePosts = (state: Pick2<IReduxState, "app", "posts">) =>
    getFuturePosts(state.app.posts);

export const connectedToInternet = (
    state: Pick2<IReduxState, "netInfo", "connected">
) => state.netInfo.connected;

export const pushNotificationsEnabled = (
    state: Pick2<IReduxState, "settings", "notificationsEnabled">
) => state.settings.notificationsEnabled;
