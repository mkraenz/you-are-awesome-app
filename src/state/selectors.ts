import { Pick2 } from "../utils/ts/Pick2";
import { IState } from "./state/IState";

export const pushNotificationsEnabled = (
    state: Pick2<IState, "app", "pushNotificationsEnabled">
) => state.app.pushNotificationsEnabled;

export const internetConnected = (
    state: Pick2<IState, "network", "connected">
) => state.network.connected;

export const analyticsEnabled = (
    state: Pick2<IState, "app", "analyticsEnabled">
) => state.app.analyticsEnabled;

export const countMyContributions = (
    state: Pick2<IState, "contributions", "myMessages">
) => state.contributions.myMessages.length;

export const darkModeEnabled = (state: Pick2<IState, "app", "isDarkModeOn">) =>
    state.app.isDarkModeOn;

export const language = (state: Pick2<IState, "app", "language">) =>
    state.app.language;
