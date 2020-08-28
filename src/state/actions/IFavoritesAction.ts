import { IMessage } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type IFavoritesAction = IAddToFavorites | IDeleteFavorites;

export type IAddToFavorites = IActionWithPayload<
    ActionType.AddToFavorites,
    IMessage
>;

export type IDeleteFavorites = IActionWithPayload<
    ActionType.DeleteFavorites,
    { ids: string[] }
>;
