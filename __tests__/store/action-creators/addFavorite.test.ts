import { addFavorite } from "../../../src/state/action-creators/addFavorite";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action with exact DatedMessage format", () => {
    const msg = {
        author: "my author",
        country: "my country",
        id: "id-123",
        isodate: "2020-06-01",
        text: "Whoo awesome!",
        unusedProp: "bla",
    };
    const result = addFavorite(msg);

    expect(result.type).toEqual(ActionType.AddToFavorites);
    expect(result.payload).toEqual({
        author: "my author",
        country: "my country",
        id: "id-123",
        isodate: "2020-06-01",
        text: "Whoo awesome!",
    });
});
