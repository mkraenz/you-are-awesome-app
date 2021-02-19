import { deleteMyContributions } from "../../../src/state/action-creators/deleteMyContributions";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns the correct action", () => {
    const result = deleteMyContributions(["id-1", "id-2"], 3);

    expect(result.type).toEqual(ActionType.DeleteMyContributions);
    expect(result.payload).toEqual({
        ids: ["id-1", "id-2"],
        previousMessagesCount: 3,
    });
});
