import { waitAndSendPostToServer } from "../../src/api/sendPostToServer";

describe("waitAndSendPostToServer()", () => {
    it("returns the response json body", async () => {
        const responseBody = { myData: "someValue" };
        const fetchMock = jest.fn(() =>
            Promise.resolve(({
                status: 201, // http created
                json: () => responseBody,
            } as unknown) as Response)
        );
        const post = {
            author: "my author",
            country: "my country",
            text: "my text",
        };

        const result = await waitAndSendPostToServer(
            post,
            "irrelevant-uri",
            0,
            fetchMock
        );

        expect(result).toBe(responseBody);
        expect(fetchMock).toHaveBeenCalledWith("irrelevant-uri", {
            body: JSON.stringify(post),
            headers: {
                ["Content-Type"]: "application/json",
            },
            method: "POST",
            redirect: "error",
        });
    });

    it("returns the response json body", async () => {
        const fetchMock = jest.fn(() =>
            Promise.resolve(({
                status: 199,
            } as unknown) as Response)
        );

        const resultPromise = waitAndSendPostToServer(
            {
                author: "my author",
                country: "my country",
                text: "my text",
            },
            "irrelevant-uri",
            0,
            fetchMock
        );

        // TODO #27 not working
        await expect(resultPromise).rejects.toThrow(
            /Expected POST response status 201, found 199/
        );
    });
});
