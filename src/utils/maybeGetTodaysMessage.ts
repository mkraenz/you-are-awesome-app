import { IMessage } from "../state/state/IMessage";
import { toIsoDateString } from "./toTodayString";

export const maybeGetTodaysMessages = (
    now: Date,
    messages: IMessage[]
): IMessage | undefined => {
    const today = toIsoDateString(now);
    // why does Array.find() not have return type T | undefined?
    return messages.find((msg) => msg.isodate.slice(0, 10) === today);
};
