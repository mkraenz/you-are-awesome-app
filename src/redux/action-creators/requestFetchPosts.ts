import { IPostsFetchRequested } from "../Actions";
import { ReduxAction } from "../ReduxAction";

export const requestFetchPosts = (now: Date): IPostsFetchRequested => {
    return {
        type: ReduxAction.PostsFetchRequested,
        payload: { now },
    };
};
