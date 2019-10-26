import { IPostContent } from "../redux/IPost";

/**
 * Pick props so that the returned value is an exact IPostContent with no additional props.
 * Strange U type is because this might get called with something containing more than an IPostContent.
 */
export const pickPostContent = <U extends IPostContent>(
    post: U
): IPostContent => ({
    author: post.author,
    country: post.country,
    text: post.text,
});
