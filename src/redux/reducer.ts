import { IAddPost } from "./Actions";
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
    action: IAddPost
): IReduxState => {
    switch (action.type) {
        case ReduxAction.AddPost:
            return {
                ...state,
                currentPost: action.payload,
            };
    }
    return state;
};
