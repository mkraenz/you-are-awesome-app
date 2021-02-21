import { IAppState } from "./IAppState";
import { IFavoritesState } from "./IFavoritesState";
import { IMessagesState } from "./IMessagesState";
import { INetworkState } from "./INetworkState";
import { IContributionsState } from "./IContributionsState";

export type IState = Readonly<{
    messages: IMessagesState;
    app: IAppState;
    network: INetworkState;
    submitMessage: IContributionsState;
    favorites: IFavoritesState;
}>;
