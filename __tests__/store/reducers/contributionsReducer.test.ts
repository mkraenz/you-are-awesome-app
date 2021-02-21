import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IContributionRequested,
    IContributionSucceeded,
    IDeleteMyContributions,
} from "../../../src/state/actions/ContributeAction";
import { contributionsReducer } from "../../../src/state/reducers/contributionsReducer";
import { IContributionsState } from "../../../src/state/state/IContributionsState";
import { mock } from "../../helpers/mocks";

it("should return the initial state", () => {
    // @ts-expect-error
    const result = contributionsReducer(undefined, {});

    expect(result).toEqual({ myMessages: [] });
});

it(`should handle ${ActionType.ContributionSucceeded}`, () => {
    const action: IContributionSucceeded = {
        type: ActionType.ContributionSucceeded,
        payload: mock.message,
    };
    const state: IContributionsState = {
        myMessages: [],
    };

    const result = contributionsReducer(state, action);

    const expected: IContributionsState = {
        myMessages: [],
    };
    expect(result).toEqual(expected);
});

describe(`${ActionType.ContributionRequested}`, () => {
    it("should add the new message to my messages", () => {
        const action: IContributionRequested = {
            type: ActionType.ContributionRequested,
            payload: {
                ...mock.message,
            },
        };
        const state: IContributionsState = {
            myMessages: [],
        };

        const result = contributionsReducer(state, action);

        const expected: IContributionsState = {
            myMessages: [mock.message],
        };
        expect(result).toEqual(expected);
    });

    it(`does not add if id already exists`, () => {
        const action: IContributionRequested = {
            type: ActionType.ContributionRequested,
            payload: {
                author: "humpty dumpty",
                text: "I sit on a wall",
                country: "England",
                id: "id-1",
                isodate: "2020-08-25",
            },
        };
        const state: IContributionsState = {
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

        const result = contributionsReducer(state, action);

        const expected: IContributionsState = {
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
        const old: IContributionRequested = {
            type: ActionType.ContributionRequested,
            payload: msg,
        };
        const newest: IContributionRequested = {
            type: ActionType.ContributionRequested,
            payload: { ...msg, isodate: "2020-08-26", id: "id-new" },
        };
        const state: IContributionsState = {
            myMessages: [],
        };

        // permutate the timestamps
        const resultState1 = contributionsReducer(
            contributionsReducer(state, old),
            newest
        );
        const resultState2 = contributionsReducer(
            contributionsReducer(state, newest),
            old
        );

        const expected: IContributionsState = {
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
        const state: IContributionsState = {
            myMessages: [{ ...mock.message, id: "different-id" }],
        };

        const result = contributionsReducer(state, action);

        const expected: IContributionsState = {
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
        const state: IContributionsState = {
            myMessages: mock.messages,
        };

        const result = contributionsReducer(state, action);

        const expected: IContributionsState = {
            myMessages: [mock.messages[0]],
        };
        expect(result).toEqual(expected);
    });
});
