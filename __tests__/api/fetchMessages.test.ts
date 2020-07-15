import { fetchMessages } from "../../src/api/fetchPosts";
import { MessageWithDate } from "../../src/state/state/IMessage";

describe("fetchMessages", () => {
    it("returns todays message if found", async () => {
        const isodate = "2016-01-01";
        const messages: MessageWithDate[] = [
            {
                author: "author-1",
                country: "country-1",
                id: "id-1",
                text: "text-1",
                isodate,
            },
        ];
        const fetchMock = jest.fn(() =>
            Promise.resolve(({
                json: () => ({
                    rows: messages,
                }),
            } as unknown) as Response)
        );

        const result = await fetchMessages("irrelevant-uri", fetchMock);

        expect(result).toBe(messages);
        expect(fetchMock).toBeCalledWith("irrelevant-uri");
    });

    it("returns a random message as fallback", async () => {
        const isodate = "2017-12-19";
        const messages: MessageWithDate[] = [
            {
                author: "author-1",
                country: "country-1",
                id: "id-1",
                text: "text-1",
                isodate,
            },
        ];

        const result = await fetchMessages("irrelevant", () =>
            Promise.resolve(({
                json: () => ({
                    rows: messages,
                }),
            } as unknown) as Response)
        );

        expect(result).toBe(messages);
    });
});
