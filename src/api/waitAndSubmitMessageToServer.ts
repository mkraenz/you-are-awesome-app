import axios, { AxiosRequestConfig } from "axios";
import { IMessage } from "../state/state/IMessage";
import { pick } from "../utils/pick";

const HTTP_CREATED = 201;

export const waitAndSubmitMessageToServer = async (
    msg: IMessage,
    uri: string,
    backoffInMs: number
) => {
    await delay(backoffInMs);
    // TODO #254 adjust user contributions API
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

const delay = (backoffInMs: number) =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, backoffInMs)
    );

const options: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json",
    },
    maxRedirects: 0,
};
