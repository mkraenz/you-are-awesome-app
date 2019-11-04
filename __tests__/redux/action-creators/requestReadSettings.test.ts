import { ReduxAction } from "../../../src/redux/ReduxAction";
import { requestReadSettings } from "../../../src/redux/action-creators/requestReadSettings";

it("returns correct action", () => {
    const result = requestReadSettings();

    expect(result).toEqual({ type: ReduxAction.ReadSettingsRequested });
});
