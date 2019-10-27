import {
    IPostSendRequested,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../../../src/redux/Actions";
import { IReduxStateApp } from "../../../src/redux/IReduxState";
import {
    initialPost,
    postReducer,
} from "../../../src/redux/reducers/postReducer";
import { ReduxAction } from "../../../src/redux/ReduxAction";
import { mock } from "../../helpers/mocks";

describe("postReducer", () => {
    it("should return the initial state", () => {
        const result = postReducer(undefined, {} as any);

        expect(result).toEqual({
            currentPost: initialPost,
            refreshing: false,
            lastUpdate: new Date(0),
        });
    });

    it(`should handle ${ReduxAction.PostSendRequested}`, () => {
        const action: IPostSendRequested = {
            type: ReduxAction.PostSendRequested,
            payload: mock.post,
        };
        const state: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = postReducer(state, action);

        const expected: IReduxStateApp = {
            currentPost: mock.post,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ReduxAction.PostsFetchRequested}`, () => {
        const action: IPostsFetchRequested = {
            type: ReduxAction.PostsFetchRequested,
            payload: { now: new Date(123) },
        };
        const state: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = postReducer(state, action);

        const expected: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ReduxAction.PostsFetchSucceeded}`, () => {
        const action: IPostsFetchSucceeded = {
            type: ReduxAction.PostsFetchSucceeded,
            payload: {
                now: new Date(123),
                post: mock.post,
            },
        };
        const state: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = postReducer(state, action);

        const expected: IReduxStateApp = {
            currentPost: action.payload.post,
            lastUpdate: action.payload.now,
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ReduxAction.PostsFetchFailedTimeoutExceeded}`, () => {
        const action: IPostsFetchFailedTimeoutExceeded = {
            type: ReduxAction.PostsFetchFailedTimeoutExceeded,
            payload: {
                error: new Error("an error message"),
                originalAction: {
                    type: ReduxAction.PostsFetchRequested,
                    payload: {
                        now: new Date("2013"),
                    },
                },
            },
            error: true,
        };
        const state: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = postReducer(state, action);

        const expected: IReduxStateApp = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });
});
