import { IPost } from "./IPost";

const HTTP_CREATED = 201;

export const sendAddedPostToServer = async (post: IPost, uri: string) => {
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "error",
        body: JSON.stringify(post),
    });
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
