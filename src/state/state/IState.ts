import { IAppState } from "./IAppState";
import { IMessagesState } from "./IMessagesState";
import { INetworkState } from "./INetworkState";
import { ISubmitMessageState } from "./ISubmitMessageState";

export interface IState {
    messages: IMessagesState;
    app: IAppState;
    network: INetworkState;
    submitMessage: ISubmitMessageState;
}
