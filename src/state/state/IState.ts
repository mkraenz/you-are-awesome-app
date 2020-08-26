import { IAppState } from "./IAppState";
import { IFavoritesState } from "./IFavoritesState";
import { IMessagesState } from "./IMessagesState";
import { INetworkState } from "./INetworkState";
import { ISubmitMessageState } from "./ISubmitMessageState";

export type IState = Readonly<{
    messages: IMessagesState;
    app: IAppState;
    network: INetworkState;
    submitMessage: ISubmitMessageState;
    favorites: IFavoritesState;
}>;
