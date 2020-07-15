import { ActionType } from "../actions/ActionType";
import { IPostsFetchRequested } from "../actions/IAction";

export const requestFetchPosts = (now: Date): IPostsFetchRequested => {
    return {
        type: ActionType.PostsFetchRequested,
        payload: { now },
    };
};
