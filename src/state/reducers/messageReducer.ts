import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../state/IMessage";

export const initialMessage: IMessage = {
    id: "default",
    author: "Max",
    country: "Germany",
    text: "You can make a change. Stay awesome as you are!",
    isodate: "2019-11-12",
};

const initialState = {
    currentMessage: initialMessage,
    refreshing: false,
    lastUpdate: new Date(0), // epoch
};

type FetchMessageRequestedAction = PayloadAction<
    { now: Date },
    "message/fetchMessagesRequested"
>;

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        fetchMessagesSucceeded(
            state,
            action: PayloadAction<{
                message: IMessage;
                now: Date;
                messages: IMessage[];
            }>
        ) {
            const { message, now } = action.payload;

            state.currentMessage = message;
            state.refreshing = false;
            state.lastUpdate = now;
        },
        fetchMessagesRequested: {
            reducer(state, action: PayloadAction<{ now: Date }>) {
                state.refreshing = true;
            },
            prepare(now: Date) {
                return { payload: { now } };
            },
        },
        fetchMessagesFailed: {
            reducer(
                state,
                action: PayloadAction<{
                    originalAction: FetchMessageRequestedAction;
                    error: Error;
                }>
            ) {},
            // adding error: true to ensure backwards compatibility. Not sure we ever used the action.error property
            prepare(payload: {
                originalAction: FetchMessageRequestedAction;
                error: Error;
            }) {
                return { payload, error: true };
            },
        },
        fetchMessagesFailedTimeoutExceeded(
            state,
            action: PayloadAction<{
                originalAction: FetchMessageRequestedAction;
                error: Error;
            }>
        ) {
            state.refreshing = false;
        },
    },
});

export const {
    fetchMessagesSucceeded,
    fetchMessagesRequested,
    fetchMessagesFailed,
    fetchMessagesFailedTimeoutExceeded,
} = messageSlice.actions;

export default messageSlice.reducer;
