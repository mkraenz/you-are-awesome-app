import { IMessage } from "./IMessage";

export type IMessagesState = Readonly<{
    currentMessage: IMessage;
    refreshing: boolean;
    lastUpdate: Date;
}>;
