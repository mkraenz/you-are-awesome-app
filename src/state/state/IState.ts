import { IAppState } from "./IAppState";
import { INetworkState } from "./INetworkState";
import { IMessagesState } from "./IMessagesState";
import { ISubmitMessageState } from "./ISubmitMessageState";

export interface IState {
    messages: IMessagesState;
    app: IAppState;
    network: INetworkState;
    submitMessage: ISubmitMessageState;
}
