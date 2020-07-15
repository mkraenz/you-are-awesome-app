import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { IPostAction } from "../actions/IAction";
import { IPost } from "../state/IPost";
import { IPostsState } from "../state/IPostsState";

export const initialPost: IPost = {
    id: "0",
    // text: "Loading...",
    // author: "",
    // country: "", // TODO delete
    author: "Max",
    country: "Germany",
    text: "You can make a change. Stay awesome as you are!",
};

export const postReducer: Reducer<IPostsState, IPostAction> = (
    state = {
        currentPost: initialPost,
        refreshing: false,
        lastUpdate: new Date(0), // epoch
    },
    action
) => {
    switch (action.type) {
        case ActionType.PostSendRequested:
            return {
                ...state,
                currentPost: action.payload,
                refreshing: false,
            };
        case ActionType.PostsFetchSucceeded:
            return {
                ...state,
                currentPost: action.payload.post,
                lastUpdate: action.payload.now,
                refreshing: false,
            };
        case ActionType.PostsFetchRequested:
            return {
                ...state,
                refreshing: true,
            };
        case ActionType.PostsFetchFailedTimeoutExceeded:
            return {
                ...state,
                refreshing: false,
            };
    }
    return state;
};
