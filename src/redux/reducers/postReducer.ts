import {
    IPostSendRequested,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../Actions";
import { IPost } from "../IPost";
import { IReduxStateApp } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

export const initialPost: IPost = {
    id: "0",
    text: "Loading...",
    author: "",
    country: "",
};

export const FETCH_POSTS_URI =
    "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false";
export const SEND_POST_URI =
    "https://s25cfu9sz3.execute-api.eu-central-1.amazonaws.com/prod/contrib";

export const postReducer = (
    state: IReduxStateApp = {
        currentPost: initialPost,
        refreshing: false,
        lastUpdate: new Date(0), // epoch
        posts: [],
    },
    action:
        | IPostSendRequested
        | IPostsFetchSucceeded
        | IPostsFetchRequested
        | IPostsFetchFailedTimeoutExceeded
): IReduxStateApp => {
    switch (action.type) {
        case ReduxAction.PostSendRequested:
            return {
                ...state,
                currentPost: action.payload,
                refreshing: false,
            };
        case ReduxAction.PostsFetchSucceeded:
            return {
                ...state,
                currentPost: action.payload.post,
                lastUpdate: action.payload.now,
                posts: action.payload.posts,
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
