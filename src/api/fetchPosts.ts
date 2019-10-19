import { random } from "lodash";
import { PostWithDate } from "../redux/IPost";
import { maybeGetTodaysPost } from "./maybeGetTodaysPost";

export async function fetchPosts(uri: string, now = new Date()) {
    const response = await fetch(uri);
    // NOTE: capital letters in the google sheets header (= names of the json's properties)
    // will be converted to all small letters
    const posts: PostWithDate[] = (await response.json()).rows;
    const todaysPost = maybeGetTodaysPost(now, posts);
    if (todaysPost) {
        return todaysPost;
    } else {
        return posts[random(posts.length - 1)];
    }
}
