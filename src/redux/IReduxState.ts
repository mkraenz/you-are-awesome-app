import { IPost } from "./IPost";

export interface IReduxState {
    app: IReduxStateApp;
    networking: IReduxStateNetworking;
}

export interface IReduxStateApp {
    currentPost: IPost;
    refreshing: boolean;
}

export interface IReduxStateNetworking {
    backoffInMs: number;
}
