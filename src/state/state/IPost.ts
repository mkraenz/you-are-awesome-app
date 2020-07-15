export interface IMessageContent {
    country: string;
    text: string;
    author: string;
}

export interface IMessage extends IMessageContent {
    id: string;
}

export type MessageWithDate = IMessage & { isodate: string };
