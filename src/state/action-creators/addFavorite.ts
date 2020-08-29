import { pick } from "../../utils/pick";
import { ActionType } from "../actions/ActionType";
import { IAddToFavorites } from "../actions/IFavoritesAction";
import { IMessage } from "../state/IMessage";

export const addFavorite = (msg: IMessage): IAddToFavorites => ({
    type: ActionType.AddToFavorites,
    payload: pick(msg, ["isodate", "country", "author", "text", "id"]),
});
