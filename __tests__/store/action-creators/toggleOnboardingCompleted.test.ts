import { toggleOnboardingCompleted } from "../../../src/state/action-creators/toggleOnboardingCompleted";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = toggleOnboardingCompleted();

    expect(result).toEqual({ type: ActionType.ToggleOnboardingCompleted });
});
