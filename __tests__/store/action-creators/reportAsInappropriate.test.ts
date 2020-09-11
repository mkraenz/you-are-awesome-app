import { reportAsInappropriate } from "../../../src/state/action-creators/reportAsInappropriate";
import { ActionType } from "../../../src/state/actions/ActionType";

it("returns correct action", () => {
    const result = reportAsInappropriate("id-123", "someReason", "");

    const expected: ReturnType<typeof reportAsInappropriate> = {
        type: ActionType.ReportAsInappropriate,
        payload: {
            messageId: "id-123",
            reason: "someReason",
            comment: "",
        },
    };
    expect(result).toEqual(expected);
});

it("throws for reason 'other' without comment", () => {
    const resultFn = () =>
        reportAsInappropriate("id-123", "reportReasonOther", "");

    expect(resultFn).toThrow(/requires a comment/);
});

it("returns correct action reason 'other' with comment", () => {
    const result = reportAsInappropriate(
        "id-123",
        "reportReasonOther",
        "I must be provided"
    );

    const expected: ReturnType<typeof reportAsInappropriate> = {
        type: ActionType.ReportAsInappropriate,
        payload: {
            messageId: "id-123",
            reason: "reportReasonOther",
            comment: "I must be provided",
        },
    };
    expect(result).toEqual(expected);
});
