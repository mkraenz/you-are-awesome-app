export interface IMessageContent {
    country: string;
    text: string;
    author: string;
}

export type IMessage = IMessageContent & { isodate: string; id: string };
