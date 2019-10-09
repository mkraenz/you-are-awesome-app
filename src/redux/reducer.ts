import { IPost } from "../pages/IPost";
import { ReduxAction } from "../pages/ReduxAction";

const currentPost: IPost = {
    id: "0",
    text: "dummy text",
    author: "dummy author",
    country: "dummy country",
};

export const reducer = (
    state = { currentPost },
    action: { type: ReduxAction; payload: IPost }
) => {
    switch (action.type) {
        case ReduxAction.AddPost:
            return {
                ...state,
                currentPost: action.payload,
            };
    }
    return state;
};
