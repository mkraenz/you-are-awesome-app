import { IAppState } from "./IAppState";
import { INetworkState } from "./INetworkState";
import { IPostsState } from "./IPostsState";
import { ISendPostState } from "./ISendPostState";

export interface IState {
    posts: IPostsState;
    app: IAppState;
    network: INetworkState;
    sendPost: ISendPostState;
}
