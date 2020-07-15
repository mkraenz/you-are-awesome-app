import { toggleDarkTheme } from "../../../src/state/action-creators/toggleDarkTheme";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = toggleDarkTheme();

    expect(result.type).toEqual(ActionType.ToggleDarkTheme);
});
