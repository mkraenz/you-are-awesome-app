import { IMessage } from "./IPost";

export interface IMessagesState {
    currentMessage: IMessage;
    refreshing: boolean;
    lastUpdate: Date;
}
