import { contribute } from "../../../src/state/action-creators/contribute";
import { ActionType } from "../../../src/state/actions/ActionType";
import { mock } from "../../helpers/mocks";

it("returns correct action", () => {
    const msg = mock.message;

    const result = contribute(msg);

    expect(result).toEqual({
        type: ActionType.ContributionRequested,
        payload: msg,
    });
});
