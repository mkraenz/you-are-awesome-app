import { random } from "lodash";
import { PostWithDate } from "../state/state/IPost";
import { maybeGetTodaysPost } from "./maybeGetTodaysPost";

export function todayOrRandomPost(posts: PostWithDate[], now = new Date()) {
    const todaysPost = maybeGetTodaysPost(now, posts);
    if (todaysPost) {
        return todaysPost;
    }
    return posts[random(posts.length - 1)];
}
