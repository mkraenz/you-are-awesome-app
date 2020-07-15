import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IFetchMessagesFailedTimeoutExceeded,
    IFetchMessagesRequested,
    IFetchMessagesSucceeded,
    ISubmitMessageRequested,
} from "../../../src/state/actions/IAction";
import {
    initialMessage,
    messageReducer,
} from "../../../src/state/reducers/postReducer";
import { IMessagesState } from "../../../src/state/state/IPostsState";
import { mock } from "../../helpers/mocks";

describe("messagesReducer", () => {
    it("should return the initial state", () => {
        const result = messageReducer(undefined, {} as any);

        const expected: IMessagesState = {
            currentMessage: initialMessage,
            refreshing: false,
            lastUpdate: new Date(0),
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.SubmitMessageRequested}`, () => {
        const action: ISubmitMessageRequested = {
            type: ActionType.SubmitMessageRequested,
            payload: mock.message,
        };
        const state: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = messageReducer(state, action);

        const expected: IMessagesState = {
            currentMessage: mock.message,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.FetchMessagesRequested}`, () => {
        const action: IFetchMessagesRequested = {
            type: ActionType.FetchMessagesRequested,
            payload: { now: new Date(123) },
        };
        const state: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = messageReducer(state, action);

        const expected: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.FetchMessagesSucceeded}`, () => {
        const action: IFetchMessagesSucceeded = {
            type: ActionType.FetchMessagesSucceeded,
            payload: {
                now: new Date(123),
                message: mock.message,
                messages: mock.messages,
            },
        };
        const state: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = messageReducer(state, action);

        const expected: IMessagesState = {
            currentMessage: action.payload.message,
            lastUpdate: action.payload.now,
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.FetchMessagesFailedTimeoutExceeded}`, () => {
        const action: IFetchMessagesFailedTimeoutExceeded = {
            type: ActionType.FetchMessagesFailedTimeoutExceeded,
            payload: {
                error: new Error("an error message"),
                originalAction: {
                    type: ActionType.FetchMessagesRequested,
                    payload: {
                        now: new Date("2013"),
                    },
                },
            },
            error: true,
        };
        const state: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = messageReducer(state, action);

        const expected: IMessagesState = {
            currentMessage: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });
});
