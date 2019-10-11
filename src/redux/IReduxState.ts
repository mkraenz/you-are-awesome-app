import { IPost } from "./IPost";

export interface IReduxState {
    app: IReduxStateApp;
    networking: IReduxStateNetworking;
}

export interface IReduxStateApp {
    currentPost: IPost;
    SERVER_URI: string;
}

export interface IReduxStateNetworking {
    backoffInMs: number;
}
