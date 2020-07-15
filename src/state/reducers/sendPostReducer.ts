import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { SendPostAction } from "../actions/SendPostAction";
import { ISendPostState } from "../state/ISendPostState";

/** exponential backoff for sending new posts to the server */
export const sendPostReducer: Reducer<ISendPostState, SendPostAction> = (
    state = {
        backoffInMs: 0,
    },
    action
) => {
    switch (action.type) {
        case ActionType.PostSendSucceeded:
            return { ...state, backoffInMs: 0 };
        case ActionType.PostSendFailed:
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
