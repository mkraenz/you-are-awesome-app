import { IAddPost, IPostFetched } from "./Actions";
import { IPost } from "./IPost";
import { IReduxState } from "./IReduxState";
import { ReduxAction } from "./ReduxAction";

const currentPost: IPost = {
    id: "0",
    text: "dummy text",
    author: "dummy author",
    country: "dummy country",
};

const fetchPostsFrom =
    "https://my-json-server.typicode.com/proSingularity/you-are-awesome-app/posts";

export const reducer = (
    state: IReduxState = { currentPost, fetchPostsFrom },
    action: IAddPost | IPostFetched
): IReduxState => {
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
