import { IPersistAppState } from "./IPersistAppState";
import { IPersistFavoritesState } from "./IPersistFavoritesState";

export interface IPersistState {
    app: IPersistAppState;
    favorites: IPersistFavoritesState;
}
