export interface IMessageContent {
    country: string;
    text: string;
    author: string;
}

export interface IMessageWithId extends IMessageContent {
    id: string;
}

export type IMessage = IMessageWithId & { isodate: string };
