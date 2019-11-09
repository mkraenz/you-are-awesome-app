import { PostWithDate } from "../redux/IPost";

export async function fetchPosts(uri: string, fetchFn = fetch) {
    const response = await fetchFn(uri);
    // NOTE: capital letters in the google sheets header (= names of the json's properties)
    // will be converted to all small letters
    const posts: PostWithDate[] = (await response.json()).rows;
    return posts;
}
