import { IReduxState } from "./IReduxState";

export const backoffInMs = (state: Pick<IReduxState, "networking">) =>
    state.networking.backoffInMs;
