import { ActionType } from "../actions/ActionType";
import { IToggleAnalytics } from "../actions/IAppAction";

export const toggleAnalytics = (): IToggleAnalytics => ({
    type: ActionType.ToggleAnalytics,
});
