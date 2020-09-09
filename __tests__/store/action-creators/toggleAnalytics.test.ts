import { toggleAnalytics } from "../../../src/state/action-creators/toggleAnalytics";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = toggleAnalytics();

    expect(result).toEqual({ type: ActionType.ToggleAnalytics });
});
