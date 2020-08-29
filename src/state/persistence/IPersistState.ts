import { IPersistAppState } from "./IPersistAppState";
import { IPersistFavoritesState } from "./IPersistFavoritesState";
import { IPersistSubmitMessageState } from "./IPersistSubmitMessageState";

export interface IPersistState {
    app: IPersistAppState;
    favorites: IPersistFavoritesState;
    submitMessage: IPersistSubmitMessageState;
}
