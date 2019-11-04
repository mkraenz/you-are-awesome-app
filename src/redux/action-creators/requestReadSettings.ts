import { IReadSettingsRequested } from "../Actions";
import { ReduxAction } from "../ReduxAction";

export const requestReadSettings = (): IReadSettingsRequested => ({
    type: ReduxAction.ReadSettingsRequested,
});
