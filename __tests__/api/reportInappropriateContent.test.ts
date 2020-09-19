import axios from "axios";
import { range } from "lodash";
import { reportInappropriateContent } from "../../src/api/reportInappropriateContent";
import { CONFIG } from "../../src/config";

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("reportInappropriateContent()", () => {
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

    it("rejects if not status code 200 Success", async () => {
        // range excludes the end, so 200 is not in the array
        for (const status of [...range(0, 200), ...range(201, 550)]) {
            jest.spyOn(axios, "post").mockResolvedValue({
                status,
                data: { a: "b" },
            });
            const report = {
                messageId: "message-id-1234",
                reason: "reportReasonInfringement",
                comment: "",
            };

            const resultPromise = reportInappropriateContent(report);

            await expect(resultPromise).rejects.toThrow(
                new RegExp(`Reporting inappropriate content failed. Response: `)
            );
        }
    });
});
