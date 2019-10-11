import { IReduxState } from "./IReduxState";

export const backoffInMs = (state: IReduxState) => state.networking.backoffInMs;
