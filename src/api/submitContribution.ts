import axios, { AxiosRequestConfig } from "axios";
import { IMessage } from "../state/state/IMessage";
import { pick } from "../utils/pick";

const HTTP_CREATED = 201;

export const submitContribution = async (msg: IMessage, uri: string) => {
    const response = await axios.post<IMessage>(
        uri,
        pick(msg, ["author", "country", "isodate", "id", "text"]),
        options
    );
    if (response.status !== HTTP_CREATED) {
        return Promise.reject(
            new Error(
                `Expected POST response status ${HTTP_CREATED}, found ${response.status}. POST uri: ${uri}`
            )
        );
    }
    return response.data;
};

const options: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    maxRedirects: 0,
};
