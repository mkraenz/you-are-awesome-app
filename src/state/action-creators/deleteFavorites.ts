import { ActionType } from "../actions/ActionType";
import { IDeleteFavorites } from "../actions/IFavoritesAction";

export const deleteFavorites = (ids: string[]): IDeleteFavorites => ({
    type: ActionType.DeleteFavorites,
    payload: { ids },
});
