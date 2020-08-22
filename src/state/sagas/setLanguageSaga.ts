import { getI18n } from "react-i18next";
import { takeLatest } from "redux-saga/effects";
import { ActionType } from "../actions/ActionType";
import { ISetLanguage } from "../actions/IAppAction";

function* setLanguageWorkerSaga(action: ISetLanguage) {
    try {
        getI18n().changeLanguage(action.payload.language);
    } catch (e) {
        throw new Error("Failed to set language");
    }
}

function* setLanguageSaga() {
    yield takeLatest([ActionType.SetLanguage], setLanguageWorkerSaga);
}

export default setLanguageSaga;
