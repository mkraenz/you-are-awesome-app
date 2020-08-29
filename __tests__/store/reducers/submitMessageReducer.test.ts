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
    });

    describe(`${ActionType.DeleteMyContributions}`, () => {
        it("does nothing if messages don't exist", () => {
            const action: IDeleteMyContributions = {
                type: ActionType.DeleteMyContributions,
                payload: {
                    ids: ["id-1", "id-2"],
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
