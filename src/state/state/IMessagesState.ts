import { MessageWithDate } from "./IMessage";

export type IMessagesState = Readonly<{
    currentMessage: MessageWithDate;
    refreshing: boolean;
    lastUpdate: Date;
}>;
