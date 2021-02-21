import { IPersistAppState } from "./IPersistAppState";
import { IPersistFavoritesState } from "./IPersistFavoritesState";
import { IPersistContributionsState } from "./IPersistSubmitMessageState";

export interface IPersistState {
    app: IPersistAppState;
    favorites: IPersistFavoritesState;
    submitMessage: IPersistContributionsState;
}
