import { Reducer } from "redux";
import { ActionType } from "../actions/ActionType";
import { IFavoritesAction } from "../actions/IFavoritesAction";
import { IFavoritesState } from "../state/IFavoritesState";

export const favoritesReducer: Reducer<IFavoritesState, IFavoritesAction> = (
    state = {
        messages: [],
    },
    action
) => {
    switch (action.type) {
        case ActionType.AddToFavorites:
            const newMsg = action.payload;
            const alreadyInFavorites = state.messages.find(
                (m) => m.id === newMsg.id
            );
            if (alreadyInFavorites) {
                return state;
            }
            const messages = [action.payload, ...state.messages];
            const sortedMessages = messages.sort((a, b) =>
                a.isodate < b.isodate ? 1 : -1
            );
            return {
                ...state,
                messages: sortedMessages,
            };
        default:
            return state;
    }
};
