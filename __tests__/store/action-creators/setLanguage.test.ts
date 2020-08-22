import { Language } from "../../../src/localization/localization";
import { setLanguage } from "../../../src/state/action-creators/setLanguage";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = setLanguage(Language.Japanese);

    expect(result).toEqual({
        type: ActionType.SetLanguage,
        payload: { language: Language.Japanese },
    });
});
