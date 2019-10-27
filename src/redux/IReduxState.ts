import { IPost } from "./IPost";

export interface IReduxState {
    app: IReduxStateApp;
    networking: IReduxStateNetworking;
    netInfo: IReduxStateInternetConnection;
}

export interface IReduxStateApp {
    currentPost: IPost;
    refreshing: boolean;
    lastUpdate: Date;
}

export interface IReduxStateNetworking {
    backoffInMs: number;
}

export interface IReduxStateInternetConnection {
    connected: boolean;
}
