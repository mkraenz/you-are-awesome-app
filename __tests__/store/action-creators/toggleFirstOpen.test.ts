import { toggleFirstOpen } from "../../../src/state/action-creators/toggleFirstOpen";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = toggleFirstOpen();

    expect(result).toEqual({ type: ActionType.ToggleFirstOpen });
});
