import { requestReadSettings } from "../../../src/state/action-creators/requestReadSettings";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = requestReadSettings();

    expect(result).toEqual({ type: ActionType.ReadSettingsRequested });
});
