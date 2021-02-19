import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IDeleteMyContributions,
    ISubmitMessageRequested,
    ISubmitMessageSucceeded,
} from "../../../src/state/actions/SubmitMessageAction";
import { submitMessageReducer } from "../../../src/state/reducers/submitMessageReducer";
import { ISubmitMessageState } from "../../../src/state/state/ISubmitMessageState";
import { mock } from "../../helpers/mocks";

describe("submitMessageReducer", () => {
    it("should return the initial state", () => {
        // @ts-expect-error
        const result = submitMessageReducer(undefined, {});

        expect(result).toEqual({ myMessages: [] });
    });

    it(`should handle ${ActionType.SubmitMessageSucceeded}`, () => {
        const action: ISubmitMessageSucceeded = {
            type: ActionType.SubmitMessageSucceeded,
            payload: mock.message,
        };
        const state: ISubmitMessageState = {
            myMessages: [],
        };

        const result = submitMessageReducer(state, action);

        const expected: ISubmitMessageState = {
            myMessages: [],
        };
        expect(result).toEqual(expected);
    });

    describe(`${ActionType.SubmitMessageRequested}`, () => {
        it("should add the new message to my messages", () => {
            const action: ISubmitMessageRequested = {
                type: ActionType.SubmitMessageRequested,
                payload: {
                    ...mock.message,
                },
            };
            const state: ISubmitMessageState = {
                myMessages: [],
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                myMessages: [mock.message],
            };
            expect(result).toEqual(expected);
        });

        it(`does not add if id already exists`, () => {
            const action: ISubmitMessageRequested = {
                type: ActionType.SubmitMessageRequested,
                payload: {
                    author: "humpty dumpty",
                    text: "I sit on a wall",
                    country: "England",
                    id: "id-1",
                    isodate: "2020-08-25",
                },
            };
            const state: ISubmitMessageState = {
                myMessages: [
                    Object.freeze({
                        text: "message-with-same-id",
                        author: "humpty dumpty",
                        country: "England",
                        id: "id-1",
                        isodate: "2020-08-25",
                    }),
                ],
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                myMessages: [state.myMessages[0]],
            };
            expect(result).toEqual(expected);
        });

        it(`orders by date: newest-first`, () => {
            const msg = {
                author: "Humpty Dumpty",
                text: "sat on a wall",
                country: "England",
                id: "id-old",
                isodate: "2020-08-25",
            };
            const old: ISubmitMessageRequested = {
                type: ActionType.SubmitMessageRequested,
                payload: msg,
            };
            const newest: ISubmitMessageRequested = {
                type: ActionType.SubmitMessageRequested,
                payload: { ...msg, isodate: "2020-08-26", id: "id-new" },
            };
            const state: ISubmitMessageState = {
                myMessages: [],
            };

            // permutate the timestamps
            const resultState1 = submitMessageReducer(
                submitMessageReducer(state, old),
                newest
            );
            const resultState2 = submitMessageReducer(
                submitMessageReducer(state, newest),
                old
            );

            const expected: ISubmitMessageState = {
                myMessages: [newest.payload, old.payload],
            };
            expect(resultState1).toEqual(expected);
            expect(resultState1).toEqual(resultState2);
        });
    });

    describe(`${ActionType.DeleteMyContributions}`, () => {
        it("does nothing if messages don't exist", () => {
            const action: IDeleteMyContributions = {
                type: ActionType.DeleteMyContributions,
                payload: {
                    ids: ["id-1", "id-2"],
                    previousMessagesCount: 1,
                },
            };
            const state: ISubmitMessageState = {
                myMessages: [{ ...mock.message, id: "different-id" }],
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                myMessages: [{ ...mock.message, id: "different-id" }],
            };
            expect(result).toEqual(expected);
        });

        it("deletes the specified subset of messages", () => {
            const action: IDeleteMyContributions = {
                type: ActionType.DeleteMyContributions,
                payload: {
                    ids: ["id-2"],
                    previousMessagesCount: 2,
                },
            };
            const state: ISubmitMessageState = {
                myMessages: mock.messages,
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                myMessages: [mock.messages[0]],
            };
            expect(result).toEqual(expected);
        });
    });
});
