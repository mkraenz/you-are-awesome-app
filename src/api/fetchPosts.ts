import { MessageWithDate } from "../state/state/IPost";

export async function fetchMessages(uri: string, fetchFn = fetch) {
    const response = await fetchFn(uri);
    // NOTE: capital letters in the google sheets header (= names of the json's properties)
    // will be converted to all small letters
    const messages: MessageWithDate[] = (await response.json()).rows;
    return messages;
}
