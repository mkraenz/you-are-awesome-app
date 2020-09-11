import { call, takeLatest } from "redux-saga/effects";
import { reportInappropriateContent } from "../../api/reportInappropriateContent";
import { ActionType } from "../actions/ActionType";
import { IReportAsInappropriate } from "../actions/IAppAction";

function* ReportAsInappropriatesWorkerSaga(action: IReportAsInappropriate) {
    try {
        const payload: Parameters<typeof reportInappropriateContent>[0] =
            action.payload;
        yield call(reportInappropriateContent, payload);
    } catch (e) {
        throw new Error(`Failed to report as inappropriate: ${e.message}`);
    }
}

function* reportAsInappropriateSaga() {
    yield takeLatest(
        [ActionType.ReportAsInappropriate],
        ReportAsInappropriatesWorkerSaga
    );
}

export default reportAsInappropriateSaga;
