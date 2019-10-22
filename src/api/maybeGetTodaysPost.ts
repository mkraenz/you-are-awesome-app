import { PostWithDate } from "../redux/IPost";
import { toDateString } from "../utils/toTodayString";

export const maybeGetTodaysPost = (
    now: Date,
    posts: PostWithDate[]
): PostWithDate | undefined => {
    const today = toDateString(now);
    // why does Array.find() not have return type T | undefined?
    return posts.find(post => post.isodate.slice(0, 10) === today);
};
