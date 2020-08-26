export interface IMessageContent {
    country: string;
    text: string;
    author: string;
}

export interface IMessage extends IMessageContent {
    id: string;
}

// TODO #211 rename to DatedMessage
export type MessageWithDate = IMessage & { isodate: string };
