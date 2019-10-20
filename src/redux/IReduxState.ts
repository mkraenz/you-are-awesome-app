import { IPost } from "./IPost";

export interface IReduxState {
    app: IReduxStateApp;
    networking: IReduxStateNetworking;
}

export interface IReduxStateApp {
    currentPost: IPost;
    // TODO #12 remove
    SERVER_URI: string;
    refreshing: boolean;
}

export interface IReduxStateNetworking {
    backoffInMs: number;
}
