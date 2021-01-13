import axios from "axios";
import { reportInappropriateContent } from "../../src/api/reportInappropriateContent";
import { CONFIG } from "../../src/config";

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("returns the response json body", async () => {
    const responseBody = { myData: "someValue" };
    const report = {
        messageId: "message-id-1234",
        reason: "reportReasonInfringement",
        comment: "",
    };
    const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
        status: 200,
        data: responseBody,
    });

    const result = await reportInappropriateContent(report);

    expect(result).toBe(undefined);
    expect(postSpy).toHaveBeenCalledWith(
        CONFIG.uri.reportInappropriateContent,
        report,
        {
            headers: {
                Accept: "application/json",
                ["Content-Type"]: "application/json",
            },
        }
    );
});

it("strips unnecessary props off the request body", async () => {
    const responseBody = { myData: "someValue" };
    const reportWithManyProps = {
        messageId: "message-id-1234",
        reason: "reportReasonInfringement",
        comment: "",
        prop1: 123,
        hello: "abc",
    };
    const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
        status: 200,
        data: responseBody,
    });

    const result = await reportInappropriateContent(reportWithManyProps);

    expect(result).toBe(undefined);
    expect(postSpy).toHaveBeenCalledWith(
        CONFIG.uri.reportInappropriateContent,
        {
            messageId: "message-id-1234",
            reason: "reportReasonInfringement",
            comment: "",
        },
        {
            headers: {
                Accept: "application/json",
                ["Content-Type"]: "application/json",
            },
        }
    );
});

describe("feature flags", () => {
    it("does not send network requests and returns a mock response if disable flag set for all", async () => {
        const report = {
            messageId: "message-id-1234",
            reason: "reportReasonInfringement",
            comment: "",
        };
        const postSpy = jest.spyOn(axios, "post");
        const result = await reportInappropriateContent(report, {
            all: true,
            reportInappropriateContent: false,
        });

        expect(result).toBe(undefined);
        expect(postSpy).not.toHaveBeenCalled();
    });

    it("does not send network requests and returns a mock response if disable flag set for this api", async () => {
        const report = {
            messageId: "message-id-1234",
            reason: "reportReasonInfringement",
            comment: "",
        };
        const postSpy = jest.spyOn(axios, "post");
        const result = await reportInappropriateContent(report, {
            all: false,
            reportInappropriateContent: true,
        });

        expect(result).toBe(undefined);
        expect(postSpy).not.toHaveBeenCalled();
    });
});
