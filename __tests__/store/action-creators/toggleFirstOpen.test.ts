import { toggleOnboardingCompleted } from "../../../src/state/action-creators/toggleFirstOpen";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = toggleOnboardingCompleted();

    expect(result).toEqual({ type: ActionType.ToggleOnboardingCompleted });
});
