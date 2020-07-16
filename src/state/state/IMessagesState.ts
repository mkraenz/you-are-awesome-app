import { IMessage } from "./IMessage";

export interface IMessagesState {
    currentMessage: IMessage;
    refreshing: boolean;
    lastUpdate: Date;
}
