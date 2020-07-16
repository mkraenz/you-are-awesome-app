import { ActionType } from "../actions/ActionType";
import { IReadSettingsRequested } from "../actions/IAppAction";

export const requestReadSettings = (): IReadSettingsRequested => ({
    type: ActionType.ReadSettingsRequested,
});
