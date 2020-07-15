import { changeNetInfo } from "../../../src/state/action-creators/changeNetInfo";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action for input true", () => {
    const result = changeNetInfo(true);

    expect(result.type).toEqual(ActionType.NetInfoChanged);
    expect(result.payload.connected).toBe(true);
});

it("returns correct action for input false", () => {
    const result = changeNetInfo(false);

    expect(result.type).toEqual(ActionType.NetInfoChanged);
    expect(result.payload.connected).toBe(false);
});
