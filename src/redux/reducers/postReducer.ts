import {
    IPostSendRequested,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../Actions";
import { IPost } from "../IPost";
import { IReduxStateApp } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

const currentPost: IPost = {
    id: "0",
    text: "Loading...",
    author: "",
    country: "",
};

export const FETCH_POSTS_URI =
    "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false";
export const SEND_POST_URI =
    "https://my-json-server.typicode.com/proSingularity/you-are-awesome-app/posts";

export const postReducer = (
    state: IReduxStateApp = {
        currentPost,
        refreshing: false,
    },
    action:
        | IPostSendRequested
        | IPostsFetchSucceeded
        | IPostsFetchRequested
        | IPostsFetchFailedTimeoutExceeded
): IReduxStateApp => {
    switch (action.type) {
        case ReduxAction.PostSendRequested:
        case ReduxAction.PostsFetchSucceeded:
            return {
                ...state,
                currentPost: action.payload,
                refreshing: false,
            };
        case ReduxAction.PostsFetchRequested:
            return {
                ...state,
                refreshing: true,
            };
        case ReduxAction.PostsFetchFailedTimeoutExceeded:
            return {
                ...state,
                refreshing: false,
            };
    }
    return state;
};
