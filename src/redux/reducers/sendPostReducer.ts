import { IPostSendFailed, IPostSendSucceeded } from "../Actions";
import { IReduxStateNetworking } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";

/** exponential backoff for sending new posts to the server */
export const sendPostReducer = (
    state: IReduxStateNetworking = {
        backoffInMs: 0,
    },
    action: IPostSendFailed | IPostSendSucceeded
): IReduxStateNetworking => {
    switch (action.type) {
        case ReduxAction.PostSendSucceeded:
            return { ...state, backoffInMs: 0 };
        case ReduxAction.PostSendFailed:
            return { ...state, backoffInMs: getBackoffInMs(state.backoffInMs) };
    }
    return state;
};

const getBackoffInMs = (previous: number) => {
    const oneMinute = 60000;
    if (2 * previous > oneMinute) {
        return oneMinute;
    }
    if (previous === 0) {
        return 1000;
    }
    return previous * 2;
};
