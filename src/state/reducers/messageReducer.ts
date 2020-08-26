import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { IMessageAction } from "../actions/IAction";
import { MessageWithDate } from "../state/IMessage";
import { IMessagesState } from "../state/IMessagesState";

export const initialMessage: MessageWithDate = {
    id: "default",
    author: "Max",
    country: "Germany",
    text: "You can make a change. Stay awesome as you are!",
    isodate: "2019-11-12",
};

export const messageReducer: Reducer<IMessagesState, IMessageAction> = (
    state = {
        currentMessage: initialMessage,
        refreshing: false,
        lastUpdate: new Date(0), // epoch
    },
    action
) => {
    switch (action.type) {
        case ActionType.FetchMessagesSucceeded:
            return {
                ...state,
                currentMessage: action.payload.message,
                lastUpdate: action.payload.now,
                refreshing: false,
            };
        case ActionType.FetchMessagesRequested:
            return {
                ...state,
                refreshing: true,
            };
        case ActionType.FetchMessagesFailedTimeoutExceeded:
            return {
                ...state,
                refreshing: false,
            };
        default:
            return state;
    }
};
