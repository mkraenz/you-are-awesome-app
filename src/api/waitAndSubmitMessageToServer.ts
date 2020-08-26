import axios, { AxiosRequestConfig } from "axios";
import { IMessageContent } from "../state/state/IMessage";
import { pickMessageContent } from "../utils/pickMessageContent";

const HTTP_CREATED = 201;

export const waitAndSubmitMessageToServer = async (
    msg: IMessageContent,
    uri: string,
    backoffInMs: number
) => {
    await delay(backoffInMs);
    const response = await axios.post(uri, pickMessageContent(msg), options);
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
