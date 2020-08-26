import { IMessage } from "../state/IMessage";
import { ActionType } from "./ActionType";
import { IActionWithPayload } from "./utils";

export type IFavoritesAction = IAddToFavorites;

export type IAddToFavorites = IActionWithPayload<
    ActionType.AddToFavorites,
    IMessage
>;
