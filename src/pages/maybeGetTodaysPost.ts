import { PostWithDate } from "./HomePage";

export const maybeGetTodaysPost = (now: Date, posts: PostWithDate[]) => {
    const today = now.toISOString().slice(0, 10);
    return posts.find(post => post.isoDate.slice(0, 10) === today) || null;
};
