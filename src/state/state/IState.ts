import { IAppState } from "./IAppState";
import { IContributionsState } from "./IContributionsState";
import { IFavoritesState } from "./IFavoritesState";
import { IMessagesState } from "./IMessagesState";
import { INetworkState } from "./INetworkState";

export type IState = Readonly<{
    messages: IMessagesState;
    app: IAppState;
    network: INetworkState;
    contributions: IContributionsState;
    favorites: IFavoritesState;
}>;
