import { IMessageContent } from "../state/state/IMessage";
import { pickMessageContent } from "../utils/pickMessageContent";

const HTTP_CREATED = 201;

export const waitAndSubmitMessageToServer = async (
    msg: IMessageContent,
    uri: string,
    backoffInMs: number,
    fetchFn = fetch
) => {
    await delay(backoffInMs);
    const response = await fetchFn(uri, getRequest(msg));
    if (response.status !== HTTP_CREATED) {
        return Promise.reject(
            new Error(
                `Expected POST response status ${HTTP_CREATED}, found ${response.status}. POST uri: ${uri}`
            )
        );
    }
    // TODO handle server response. what do we want here? the row? the row as an object? For what?
    const data: unknown = await response.json();
    return data;
};

const delay = (backoffInMs: number) =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, backoffInMs)
    );

const getRequest = (msg: IMessageContent): RequestInit => ({
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "error",
    body: JSON.stringify(pickMessageContent(msg)),
});
