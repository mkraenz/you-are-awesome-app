import messageReducer, {
    fetchMessagesFailedTimeoutExceeded,
    fetchMessagesRequested,
    fetchMessagesSucceeded,
    initialMessage,
} from "../../../src/state/reducers/messageReducer";
import { IMessagesState } from "../../../src/state/state/IMessagesState";
import { mock } from "../../helpers/mocks";

describe("messagesReducer", () => {
    it("should return the initial state", () => {
        // @ts-expect-error
        const result = messageReducer(undefined, {});

        const expected: IMessagesState = {
            currentMessage: initialMessage,
            refreshing: false,
            lastUpdate: new Date(0),
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${fetchMessagesRequested.type}`, () => {
        const action = {
            type: fetchMessagesRequested.type,
            payload: { now: new Date(123) },
        };
        const state: IMessagesState = {
            currentMessage: initialMessage,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = messageReducer(state, action);

        const expected: IMessagesState = {
            currentMessage: initialMessage,
            lastUpdate: new Date(0),
            refreshing: true,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${fetchMessagesSucceeded.type}`, () => {
        const action = {
            type: fetchMessagesSucceeded.type,
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

    it(`should handle ${fetchMessagesFailedTimeoutExceeded.type}`, () => {
        const action = {
            type: fetchMessagesFailedTimeoutExceeded.type,
            payload: {
                error: new Error("an error message"),
                originalAction: {
                    type: fetchMessagesRequested.type,
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
