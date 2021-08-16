import { ActionType } from "../actions/ActionType";
import { IToggleOnboardingCompleted } from "../actions/IAppAction";

export const toggleOnboardingCompleted = (): IToggleOnboardingCompleted => ({
    type: ActionType.ToggleOnboardingCompleted,
});
