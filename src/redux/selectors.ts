import { getFuturePosts } from "../utils/getFuturePosts";
import { IReduxState } from "./IReduxState";
import { Pick2 } from "../typescript/Pick2";

export const backoffInMs = (state: Pick<IReduxState, "networking">) =>
    state.networking.backoffInMs;

export const futurePosts = (state: Pick2<IReduxState, "app", "posts">) =>
    getFuturePosts(state.app.posts);
