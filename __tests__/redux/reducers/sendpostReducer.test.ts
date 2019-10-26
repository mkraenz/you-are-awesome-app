import {
    IPostSendFailed,
    IPostSendSucceeded,
} from "../../../src/redux/Actions";
import { IReduxStateNetworking } from "../../../src/redux/IReduxState";
import { sendPostReducer } from "../../../src/redux/reducers/sendPostReducer";
import { ReduxAction } from "../../../src/redux/ReduxAction";
import { mock } from "../../helpers/mocks";

describe("sendPostReducer", () => {
    it("should return the initial state", () => {
        const result = sendPostReducer(undefined, {} as any);

        expect(result).toEqual({ backoffInMs: 0 });
    });

    it("should handle POST_SEND_SUCCEEDED", () => {
        const action: IPostSendSucceeded = {
            type: ReduxAction.PostSendSucceeded,
            payload: mock.post,
        };
        const state: IReduxStateNetworking = {
            backoffInMs: 987,
        };

        const result = sendPostReducer(state, action);

        const expected: IReduxStateNetworking = {
            backoffInMs: 0,
        };
        expect(result).toEqual(expected);
    });

    describe("POST_SEND_FAILED", () => {
        it("should backoff 1 sec if first fail", () => {
            const action: IPostSendFailed = {
                type: ReduxAction.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ReduxAction.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: IReduxStateNetworking = {
                backoffInMs: 0,
            };

            const result = sendPostReducer(state, action);

            const expected: IReduxStateNetworking = {
                backoffInMs: 1000,
            };
            expect(result).toEqual(expected);
        });

        it("should double backoff", () => {
            const action: IPostSendFailed = {
                type: ReduxAction.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ReduxAction.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: IReduxStateNetworking = {
                backoffInMs: 987,
            };

            const result = sendPostReducer(state, action);

            const expected: IReduxStateNetworking = {
                backoffInMs: 987 * 2,
            };
            expect(result).toEqual(expected);
        });

        it("should max out at 1 min", () => {
            const action: IPostSendFailed = {
                type: ReduxAction.PostSendFailed,
                payload: {
                    error: new Error("an error message"),
                    originalAction: {
                        type: ReduxAction.PostSendRequested,
                        payload: mock.post,
                    },
                },
                error: true,
            };
            const state: IReduxStateNetworking = {
                backoffInMs: 30001,
            };

            const result = sendPostReducer(state, action);

            const expected: IReduxStateNetworking = {
                backoffInMs: 60000, // 1 min
            };
            expect(result).toEqual(expected);
        });
    });
});
