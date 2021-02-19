import { deleteFavorites } from "../../../src/state/action-creators/deleteFavorites";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns the correct action", () => {
    const result = deleteFavorites(["id-1", "id-2"], 30);

    expect(result.type).toEqual(ActionType.DeleteFavorites);
    expect(result.payload).toEqual({
        ids: ["id-1", "id-2"],
        previousMessagesCount: 30,
    });
});
