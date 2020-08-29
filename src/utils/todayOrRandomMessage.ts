import { random } from "lodash";
import { IMessage } from "../state/state/IMessage";
import { maybeGetTodaysMessages } from "./maybeGetTodaysMessage";

export function todaysMessageOrRandomMessage(messages: IMessage[]) {
    const todaysMessage = maybeGetTodaysMessages(new Date(), messages);
    if (todaysMessage) {
        return todaysMessage;
    }
    return messages[random(messages.length - 1)];
}
