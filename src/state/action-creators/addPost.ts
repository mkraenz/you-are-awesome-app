import { ActionType } from "../actions/ActionType";
import { ISubmitMessageRequested } from "../actions/IAction";
import { IMessage } from "../state/IPost";

export const submitMessage = (payload: IMessage): ISubmitMessageRequested => ({
    type: ActionType.SubmitMessageRequested,
    payload,
});
