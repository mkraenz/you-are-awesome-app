import { IPost } from "./IPost";

export interface IReduxState {
    currentPost: IPost;
    fetchPostsFrom: string;
}
