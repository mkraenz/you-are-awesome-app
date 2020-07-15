import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IPostSendFailed,
    IPostSendSucceeded,
} from "../../../src/state/actions/IAction";
import { sendPostReducer } from "../../../src/state/reducers/sendPostReducer";
import { ISendPostState } from "../../../src/state/state/ISendPostState";
import { mock } from "../../helpers/mocks";

describe("sendPostReducer", () => {
    it("should return the initial state", () => {
        const result = sendPostReducer(undefined, {} as any);

        expect(result).toEqual({ backoffInMs: 0 });
    });

    it("should handle POST_SEND_SUCCEEDED", () => {
        const action: IPostSendSucceeded = {
            type: ActionType.PostSendSucceeded,
            payload: mock.post,
        };
        const state: ISendPostState = {
            backoffInMs: 987,
        };

        const result = sendPostReducer(state, action);

        const expected: ISendPostState = {
            backoffInMs: 0,
        };
        expect(result).toEqual(expected);
    });

    describe("POST_SEND_FAILED", () => {
        it("should backoff 1 sec if first fail", () => {
            const action: IPostSendFailed = {
                type: ActionType.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: ISendPostState = {
                backoffInMs: 0,
            };

            const result = sendPostReducer(state, action);

            const expected: ISendPostState = {
                backoffInMs: 1000,
            };
            expect(result).toEqual(expected);
        });

        it("should double backoff", () => {
            const action: IPostSendFailed = {
                type: ActionType.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: ISendPostState = {
                backoffInMs: 987,
            };

            const result = sendPostReducer(state, action);

            const expected: ISendPostState = {
                backoffInMs: 987 * 2,
            };
            expect(result).toEqual(expected);
        });

        it("should max out at 1 min", () => {
            const action: IPostSendFailed = {
                type: ActionType.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ActionType.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: ISendPostState = {
                backoffInMs: 30001,
            };

            const result = sendPostReducer(state, action);

            const expected: ISendPostState = {
                backoffInMs: 60000, // 1 min
            };
            expect(result).toEqual(expected);
        });
    });
});
