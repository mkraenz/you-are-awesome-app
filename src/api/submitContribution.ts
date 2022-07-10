import axios, { AxiosRequestConfig } from "axios";
import { ApiFeatureFlags, CONFIG } from "../config";
import { IMessage } from "../state/state/IMessage";
import { pick } from "../utils/pick";

const mockMsg = {
    author: "my-author",
    country: "my-country",
    id: "876",
    text: "awesome-message",
    isodate: "2020-05-01",
};

export const submitContribution = async (
    msg: IMessage,
    uri: string,
    disabledFlags: ApiFeatureFlags<"submitContribution"> = CONFIG.disableApiCall
): Promise<IMessage> => {
    if (disabledFlags.all || disabledFlags.submitContribution) {
        if (process.env.NODE_ENV !== "test")
            console.log(
                "API call submitContribution disabled. Falling back to fixture"
            );
        return mockMsg;
    }
    const payload = pick(msg, ["author", "country", "isodate", "id", "text"]);
    const response = await axios.post<IMessage>(uri, payload, options);
    return response.data;
};

const options: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    maxRedirects: 0,
};
