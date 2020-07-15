import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IPostSendRequested,
    IPostsFetchFailedTimeoutExceeded,
    IPostsFetchRequested,
    IPostsFetchSucceeded,
} from "../../../src/state/actions/IAction";
import {
    initialPost,
    postReducer,
} from "../../../src/state/reducers/postReducer";
import { IPostsState } from "../../../src/state/state/IPostsState";
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

    it(`should handle ${ActionType.PostSendRequested}`, () => {
        const action: IPostSendRequested = {
            type: ActionType.PostSendRequested,
            payload: mock.post,
        };
        const state: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = postReducer(state, action);

        const expected: IPostsState = {
            currentPost: mock.post,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.PostsFetchRequested}`, () => {
        const action: IPostsFetchRequested = {
            type: ActionType.PostsFetchRequested,
            payload: { now: new Date(123) },
        };
        const state: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };

        const result = postReducer(state, action);

        const expected: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.PostsFetchSucceeded}`, () => {
        const action: IPostsFetchSucceeded = {
            type: ActionType.PostsFetchSucceeded,
            payload: {
                now: new Date(123),
                post: mock.post,
                posts: mock.posts,
            },
        };
        const state: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = postReducer(state, action);

        const expected: IPostsState = {
            currentPost: action.payload.post,
            lastUpdate: action.payload.now,
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });

    it(`should handle ${ActionType.PostsFetchFailedTimeoutExceeded}`, () => {
        const action: IPostsFetchFailedTimeoutExceeded = {
            type: ActionType.PostsFetchFailedTimeoutExceeded,
            payload: {
                error: new Error("an error message"),
                originalAction: {
                    type: ActionType.PostsFetchRequested,
                    payload: {
                        now: new Date("2013"),
                    },
                },
            },
            error: true,
        };
        const state: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: true,
        };

        const result = postReducer(state, action);

        const expected: IPostsState = {
            currentPost: null as any,
            lastUpdate: new Date(0),
            refreshing: false,
        };
        expect(result).toEqual(expected);
    });
});
