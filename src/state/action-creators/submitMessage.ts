import { ActionType } from "../actions/ActionType";
import { ISubmitMessageRequested } from "../actions/SubmitMessageAction";
import { IMessage } from "../state/IMessage";

export const submitMessage = (payload: IMessage): ISubmitMessageRequested => ({
    type: ActionType.SubmitMessageRequested,
    payload,
});
