import { IPost } from "./IPost";

export interface IReduxState {
    app: IReduxStateApp;
}

export interface IReduxStateApp {
    currentPost: IPost;
    SERVER_URI: string;
}
