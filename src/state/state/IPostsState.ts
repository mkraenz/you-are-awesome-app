import { IPost } from "./IPost";

export interface IPostsState {
    currentPost: IPost;
    refreshing: boolean;
    lastUpdate: Date;
}
