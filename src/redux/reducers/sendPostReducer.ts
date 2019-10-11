import { IPostSendFailed, IPostSendSucceeded } from "../Actions";
import { ReduxAction } from "../ReduxAction";

/** exponential backoff for sending new posts to the server */
export const sendPostReducer = (
    state = { backoffInMs: 0 },
    action: IPostSendFailed | IPostSendSucceeded
) => {
    switch (action.type) {
        case ReduxAction.PostSendSucceeded:
            return { ...state, backoff: 0 };
        case ReduxAction.PostSendFailed:
            console.log(action.payload.error.message);
            return { ...state, backoff: getBackoffInMs(state.backoffInMs) };
    }
    return state;
};

const getBackoffInMs = (previous: number) => {
    const fiveMinutes = 5 * 60000;
    if (previous > fiveMinutes) {
        return previous; // should be 512 seconds ~ 8.5 mins
    }
    if (previous === 0) {
        return 1000;
    }
    return previous * 2;
};
