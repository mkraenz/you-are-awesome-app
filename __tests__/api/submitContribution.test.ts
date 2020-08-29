import axios from "axios";
import { range } from "lodash";
import { submitContribution } from "../../src/api/submitContribution";

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("waitAndSubmitMessageToServer()", () => {
    it("returns the response json body", async () => {
        const responseBody = { myData: "someValue" };
        const msg = {
            author: "my author",
            country: "my country",
            text: "my text",
            id: "id-123",
            isodate: "2014-01-23",
        };
        const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
            status: 201,
            data: responseBody,
        });

        const result = await submitContribution(msg, "irrelevant-uri");

        expect(result).toBe(responseBody);
        expect(postSpy).toHaveBeenCalledWith("irrelevant-uri", msg, {
            headers: {
                ["Content-Type"]: "application/json",
            },
            maxRedirects: 0,
        });
    });

    it("rejects if not status code 201 Created", async () => {
        // range excludes the end, so 201 is not in the array
        for (const status of [...range(0, 201), ...range(202, 550)]) {
            jest.spyOn(axios, "post").mockResolvedValue({
                status,
                data: { a: "b" },
            });
            const msg = {
                author: "my author",
                country: "my country",
                text: "my text",
                id: "id-123",
                isodate: "2020-05-09",
            };

            const resultPromise = submitContribution(msg, "irrelevant-uri");

            await expect(resultPromise).rejects.toThrow(
                new RegExp(`Expected POST response status 201, found ${status}`)
            );
        }
    });
});
