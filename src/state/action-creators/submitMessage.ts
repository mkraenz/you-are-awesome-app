import { ActionType } from "../actions/ActionType";
import { ISubmitMessageRequested } from "../actions/SubmitMessageAction";
import { IMessageWithId } from "../state/IMessage";

export const submitMessage = (
    payload: IMessageWithId
): ISubmitMessageRequested => ({
    type: ActionType.SubmitMessageRequested,
    payload,
});
