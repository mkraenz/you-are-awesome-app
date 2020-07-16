import { IMessageContent } from "../state/state/IMessage";

/**
 * Pick props so that the returned value is an exact IMessageContent with no additional props.
 * Generic U type is because this might get called with something containing more than an IMessageContent.
 */
export const pickMessageContent = <U extends IMessageContent>(
    msg: U
): IMessageContent => ({
    author: msg.author,
    country: msg.country,
    text: msg.text,
});
