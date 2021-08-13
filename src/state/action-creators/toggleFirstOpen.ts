import { ActionType } from "../actions/ActionType";
import { IToggleFirstOpen } from "../actions/IAppAction";

export const toggleFirstOpen = (): IToggleFirstOpen => ({
    type: ActionType.ToggleFirstOpen,
});
