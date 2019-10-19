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
    "http://gsx2json.com/api?id=1n3mhIrBpeAEQVKcparkZPdCnleYFRr06jo80aUtcHgI&sheet=1&columns=false";

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
