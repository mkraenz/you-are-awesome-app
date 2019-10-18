import { IPostAdded, IPostFetched } from "../Actions";
import { IPost } from "../IPost";
import { IReduxStateApp } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

const currentPost: IPost = {
    id: "0",
    text: "Loading...",
    author: "",
    country: "",
};

export const SERVER_URI =
    "https://my-json-server.typicode.com/proSingularity/you-are-awesome-app/posts";

export const postReducer = (
    state: IReduxStateApp = { currentPost, SERVER_URI: SERVER_URI },
    action: IPostAdded | IPostFetched
): IReduxStateApp => {
    switch (action.type) {
        case ReduxAction.PostAdded:
        case ReduxAction.PostFetched:
            return {
                ...state,
                currentPost: action.payload,
            };
    }
    return state;
};
