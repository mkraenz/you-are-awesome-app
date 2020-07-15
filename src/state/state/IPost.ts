export type PostWithDate = IPost & { isodate: string };

export interface IPostContent {
    country: string;
    text: string;
    author: string;
}

export interface IPost extends IPostContent {
    id: string;
}
