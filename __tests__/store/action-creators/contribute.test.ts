import { submitMessage } from "../../../src/state/action-creators/contribute";
import { ActionType } from "../../../src/state/actions/ActionType";
import { mock } from "../../helpers/mocks";

it("returns correct action", () => {
    const msg = mock.message;

    const result = submitMessage(msg);

    expect(result).toEqual({
        type: ActionType.SubmitMessageRequested,
        payload: msg,
    });
});
