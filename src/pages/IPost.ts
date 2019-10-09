export interface IPost extends IPostContent {
    id: string;
}

export interface IPostContent {
    country: string;
    text: string;
    author: string;
}
