import { ActionType } from "../actions/ActionType";
import { IReportAsInappropriate } from "../actions/IAppAction";

export const reportAsInappropriate = (
    id: string,
    reason: string,
    comment: string
): IReportAsInappropriate => {
    if (reason === "reportReasonOther" && !comment) {
        throw new Error('Report reason "Other" requires a comment');
    }
    return {
        type: ActionType.ReportAsInappropriate,
        payload: {
            messageId: id,
            reason,
            comment,
        },
    };
};
