import { pick } from "lodash";
import { ActionType } from "../actions/ActionType";
import { IAddToFavorites } from "../actions/IFavoritesAction";
import { MessageWithDate } from "../state/IMessage";

export const addFavorite = (msg: MessageWithDate): IAddToFavorites => ({
    type: ActionType.AddToFavorites,
    payload: pick(msg, ["isodate", "country", "author", "text", "id"]),
});
