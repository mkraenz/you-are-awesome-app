import { PostWithDate } from "../redux/IPost";

export const getFuturePosts = (
    posts: PostWithDate[],
    now = new Date()
): PostWithDate[] =>
    posts.filter(isInFuture(new Date(now.setHours(0, 0, 0, 0))));

const isInFuture = (now: Date) => (post: Pick<PostWithDate, "isodate">) =>
    new Date(post.isodate) >= now;
