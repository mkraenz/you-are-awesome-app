import { PostWithDate } from "./HomePage";

export const maybeGetTodaysPost = (
    now: Date,
    posts: PostWithDate[]
): PostWithDate | undefined => {
    const today = now.toISOString().slice(0, 10);
    // why does Array.find() not have return type T | undefined?
    return posts.find(post => post.isoDate.slice(0, 10) === today);
};
