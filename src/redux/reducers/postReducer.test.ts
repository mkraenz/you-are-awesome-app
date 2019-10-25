import { IPostsFetchRequested, IPostsFetchSucceeded } from "../Actions";
import { IReduxStateApp } from "../IReduxState";
import { ReduxAction } from "../ReduxAction";
import { initialPost, postReducer } from "./postReducer";

describe("postReducer", () => {
    it("should return the initial state", () => {
        const result = postReducer(undefined, {} as any);

        expect(result).toEqual({
            currentPost: initialPost,
            refreshing: false,
            lastUpdate: new Date(0),
        });
    });

    it("should handle POSTS_FETCH_REQUESTED", () => {
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

    it("should handle POSTS_FETCH_SUCCEEDED", () => {
        const action: IPostsFetchSucceeded = {
            type: ReduxAction.PostsFetchSucceeded,
            payload: {
                now: new Date(123),
                post: {
                    author: "my-author",
                    country: "my-country",
                    id: "876",
                    text: "awesome-message",
                },
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
});
