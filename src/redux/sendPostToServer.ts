import { IPost } from "./IPost";

const HTTP_CREATED = 201;

export const waitAndSendPostToServer = async (
    post: IPost,
    uri: string,
    backoffInMs: number
) => {
    await delay(backoffInMs);
    const response = await fetch(uri, getRequest(post));
    if (response.status !== HTTP_CREATED) {
        return Promise.reject(
            new Error(
                `Expected POST response status ${HTTP_CREATED}, found ${response.status}. POST uri: ${uri}`
            )
        );
    }
    const data: IPost = await response.json();
    return data;
};

const delay = (backoffInMs: number) =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, backoffInMs)
    );

const getRequest = (post: IPost): RequestInit => ({
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    redirect: "error",
    body: JSON.stringify(post),
});
