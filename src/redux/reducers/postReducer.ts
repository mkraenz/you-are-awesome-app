import { IPostSendRequested, IPostsFetchSucceeded } from "../Actions";
import { IPost } from "../IPost";
import { IReduxStateApp } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

const currentPost: IPost = {
    id: "0",
    text: "Loading...",
    author: "",
    country: "",
};

export const GET_POSTS_URI =
    "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false";
export const SEND_POST_URI =
    "https://my-json-server.typicode.com/proSingularity/you-are-awesome-app/posts";

export const postReducer = (
    state: IReduxStateApp = { currentPost, SERVER_URI: GET_POSTS_URI },
    action: IPostSendRequested | IPostsFetchSucceeded
): IReduxStateApp => {
    switch (action.type) {
        case ReduxAction.PostSendRequested:
        case ReduxAction.PostsFetchSucceeded:
            return {
                ...state,
                currentPost: action.payload,
            };
    }
    return state;
};
