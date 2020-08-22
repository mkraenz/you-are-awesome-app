import { Language } from "../../localization/localization";
import { ActionType } from "../actions/ActionType";
import { ISetLanguage } from "../actions/IAppAction";

export const setLanguage = (language: Language): ISetLanguage => ({
    type: ActionType.SetLanguage,
    payload: { language },
});
