import { ActionType } from "../../../src/state/actions/ActionType";
import {
    ISubmitMessageFailed,
    ISubmitMessageSucceeded,
} from "../../../src/state/actions/IAction";
import { submitMessageReducer } from "../../../src/state/reducers/sendPostReducer";
import { ISubmitMessageState } from "../../../src/state/state/ISubmitMessageState";
import { mock } from "../../helpers/mocks";

describe("submitMessageReducer", () => {
    it("should return the initial state", () => {
        const result = submitMessageReducer(undefined, {} as any);

        expect(result).toEqual({ backoffInMs: 0 });
    });

    it(`should handle ${ActionType.SubmitMessageSucceeded}`, () => {
        const action: ISubmitMessageSucceeded = {
            type: ActionType.SubmitMessageSucceeded,
            payload: mock.message,
        };
        const state: ISubmitMessageState = {
            backoffInMs: 987,
        };

        const result = submitMessageReducer(state, action);

        const expected: ISubmitMessageState = {
            backoffInMs: 0,
        };
        expect(result).toEqual(expected);
    });

    describe(`${ActionType.SubmitMessageFailed}`, () => {
        it("should backoff 1 sec if first fail", () => {
            const action: ISubmitMessageFailed = {
                type: ActionType.SubmitMessageFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.SubmitMessageRequested,
                        payload: mock.message,
                    },
                },
                error: true,
            };
            const state: ISubmitMessageState = {
                backoffInMs: 0,
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                backoffInMs: 1000,
            };
            expect(result).toEqual(expected);
        });

        it("should double backoff", () => {
            const action: ISubmitMessageFailed = {
                type: ActionType.SubmitMessageFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.SubmitMessageRequested,
                        payload: mock.message,
                    },
                },
                error: true,
            };
            const state: ISubmitMessageState = {
                backoffInMs: 987,
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                backoffInMs: 987 * 2,
            };
            expect(result).toEqual(expected);
        });

        it("should max out at 1 min", () => {
            const action: ISubmitMessageFailed = {
                type: ActionType.SubmitMessageFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.SubmitMessageRequested,
                        payload: mock.message,
                    },
                },
                error: true,
            };
            const state: ISubmitMessageState = {
                backoffInMs: 30001,
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                backoffInMs: 60000, // 1 min
            };
            expect(result).toEqual(expected);
        });
    });
});
