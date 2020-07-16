import { ActionType } from "../actions/ActionType";
import { ISubmitMessageRequested } from "../actions/IAction";
import { IMessage } from "../state/IMessage";

export const submitMessage = (payload: IMessage): ISubmitMessageRequested => ({
    type: ActionType.SubmitMessageRequested,
    payload,
});
