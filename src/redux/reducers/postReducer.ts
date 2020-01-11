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
