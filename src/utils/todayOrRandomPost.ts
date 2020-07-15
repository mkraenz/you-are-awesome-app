import { random } from "lodash";
import { MessageWithDate } from "../state/state/IMessage";
import { maybeGetTodaysMessages } from "./maybeGetTodaysPost";

export function todaysMessageOrRandomMessage(
    messages: MessageWithDate[],
    now = new Date()
) {
    const todaysMessage = maybeGetTodaysMessages(now, messages);
    if (todaysMessage) {
        return todaysMessage;
    }
    return messages[random(messages.length - 1)];
}
