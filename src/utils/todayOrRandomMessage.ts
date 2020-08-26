import { random } from "lodash";
import { IMessage } from "../state/state/IMessage";
import { maybeGetTodaysMessages } from "./maybeGetTodaysMessage";

export function todaysMessageOrRandomMessage(
    messages: IMessage[],
    now = new Date()
) {
    const todaysMessage = maybeGetTodaysMessages(now, messages);
    if (todaysMessage) {
        return todaysMessage;
    }
    return messages[random(messages.length - 1)];
}
