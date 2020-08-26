import axios from "axios";
import { IMessage } from "../state/state/IMessage";

export async function fetchMessages(uri: string): Promise<IMessage[]> {
    const response = await axios.get(uri);
    // NOTE: capital letters in the google sheets header (= names of the json's properties)
    // will be converted to all small letters
    const messages: IMessage[] = response.data.rows;
    return messages.map((m) => ({
        isodate: `${m.isodate}`,
        author: `${m.author}`,
        text: `${m.text}`,
        country: `${m.country}`,
        id: `${m.id}`,
    }));
}
