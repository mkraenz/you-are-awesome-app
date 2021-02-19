import { ActionType } from "../../../src/state/actions/ActionType";
import {
    IAddToFavorites,
    IDeleteFavorites,
} from "../../../src/state/actions/IFavoritesAction";
import { favoritesReducer } from "../../../src/state/reducers/favoritesReducer";
import { IFavoritesState } from "../../../src/state/state/IFavoritesState";
import { mock } from "../../helpers/mocks";

describe("favoritesReducer()", () => {
    it("should return the initial state", () => {
        // @ts-expect-error
        const result = favoritesReducer(undefined, {});

        const expected: IFavoritesState = {
            messages: [],
        };
        expect(result).toEqual(expected);
    });

    describe(`should handle ${ActionType.AddToFavorites}`, () => {
        it(`normal case`, () => {
            const action: IAddToFavorites = {
                type: ActionType.AddToFavorites,
                payload: {
                    author: "humpty dumpty",
                    text: "I sit on a wall",
                    country: "England",
                    id: "id-1",
                    isodate: "2020-08-25",
                },
            };
            const state: IFavoritesState = {
                messages: [],
            };

            const result = favoritesReducer(state, action);

            const expected: IFavoritesState = {
                messages: [action.payload],
            };
            expect(result).toEqual(expected);
        });

        it(`does not add if id already exists`, () => {
            const action: IAddToFavorites = {
                type: ActionType.AddToFavorites,
                payload: {
                    author: "humpty dumpty",
                    text: "I sit on a wall",
                    country: "England",
                    id: "id-1",
                    isodate: "2020-08-25",
                },
            };
            const state: IFavoritesState = {
                messages: [
                    Object.freeze({
                        text: "message-with-same-id",
                        author: "humpty dumpty",
                        country: "England",
                        id: "id-1",
                        isodate: "2020-08-25",
                    }),
                ],
            };

            const result = favoritesReducer(state, action);

            const expected: IFavoritesState = {
                messages: [state.messages[0]],
            };
            expect(result).toEqual(expected);
        });

        it(`orders by date: newest-first`, () => {
            const msg = {
                author: "Humpty Dumpty",
                text: "sat on a wall",
                country: "England",
                id: "id-mid",
                isodate: "2020-08-25",
            };
            const mid: IAddToFavorites = {
                type: ActionType.AddToFavorites,
                payload: msg,
            };
            const old: IAddToFavorites = {
                type: ActionType.AddToFavorites,
                payload: { ...msg, isodate: "2020-08-01", id: "id-old" },
            };
            const newest: IAddToFavorites = {
                type: ActionType.AddToFavorites,
                payload: { ...msg, isodate: "2020-08-26", id: "id-new" },
            };
            const state: IFavoritesState = {
                messages: [],
            };

            // permutate the timestamps
            // old -> mid ->  new
            const resultState1 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, old), mid),
                newest
            );
            // mid -> old -> new
            const resultState2 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, mid), old),
                newest
            );
            // mid -> new -> old
            const resultState3 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, mid), newest),
                old
            );
            // new -> mid -> old
            const resultState4 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, newest), mid),
                old
            );
            // new -> old -> mid
            const resultState5 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, newest), old),
                mid
            );
            // old -> new -> mid
            const resultState6 = favoritesReducer(
                favoritesReducer(favoritesReducer(state, old), newest),
                mid
            );

            const expected: IFavoritesState = {
                messages: [newest.payload, mid.payload, old.payload],
            };
            expect(resultState1).toEqual(expected);
            expect(resultState1).toEqual(resultState2);
            expect(resultState2).toEqual(resultState3);
            expect(resultState3).toEqual(resultState4);
            expect(resultState4).toEqual(resultState5);
            expect(resultState5).toEqual(resultState6);
        });
    });

    describe(`should handle ${ActionType.DeleteFavorites}`, () => {
        it("does nothing of favorites state is empty", () => {
            const action: IDeleteFavorites = {
                type: ActionType.DeleteFavorites,
                payload: {
                    ids: ["id-1", "id-2"],
                    previousMessagesCount: 2,
                },
            };
            const state: IFavoritesState = {
                messages: [],
            };

            const result = favoritesReducer(state, action);

            const expected: IFavoritesState = {
                messages: [],
            };
            expect(result).toEqual(expected);
        });

        it("deletes the specified subset of messages", () => {
            const action: IDeleteFavorites = {
                type: ActionType.DeleteFavorites,
                payload: {
                    ids: ["id-2"],
                    previousMessagesCount: 2,
                },
            };
            const state: IFavoritesState = {
                messages: mock.messages,
            };

            const result = favoritesReducer(state, action);

            const expected: IFavoritesState = {
                messages: [mock.messages[0]],
            };
            expect(result).toEqual(expected);
        });
    });
});
