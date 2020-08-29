import { ActionType } from "../../../src/state/actions/ActionType";
import {
    ISubmitMessageFailed,
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
                myMessages: [],
            };

            const result = submitMessageReducer(state, action);

            const expected: ISubmitMessageState = {
                myMessages: [],
            };
            expect(result).toEqual(expected);
        });
    });
});
