import { IPersistAppState } from "./IPersistAppState";
import { IPersistContributionsState } from "./IPersistContributionsState";
import { IPersistFavoritesState } from "./IPersistFavoritesState";

export interface IPersistState {
    app: IPersistAppState;
    favorites: IPersistFavoritesState;
    contributions: IPersistContributionsState;
}
