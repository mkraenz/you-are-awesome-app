import { ActionType } from "../actions/ActionType";
import { IToggleDarkThemeAction } from "../actions/IAppAction";

export const toggleDarkTheme = (): IToggleDarkThemeAction => ({
    type: ActionType.ToggleDarkTheme,
});
