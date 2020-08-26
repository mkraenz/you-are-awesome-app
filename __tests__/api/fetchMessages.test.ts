import axios from "axios";
import { fetchMessages } from "../../src/api/fetchMessages";
import { IMessage } from "../../src/state/state/IMessage";

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe("fetchMessages", () => {
    it("returns the fetched messages", async () => {
        const isodate = "2016-01-01";
        const messages: IMessage[] = [
            {
                author: "author-1",
                country: "country-1",
                id: "id-1",
                text: "text-1",
                isodate,
            },
        ];
        const getSpy = jest.spyOn(axios, "get").mockResolvedValue({
            data: {
                rows: messages,
            },
        });

        const result = await fetchMessages("irrelevant-uri");

        expect(result).toEqual(messages);
        expect(getSpy).toBeCalledWith("irrelevant-uri");
    });

    it("returns strings for each property", async () => {
        const messages: IMessage[] = [
            {
                // @ts-expect-error
                author: 5,
                // @ts-expect-error
                country: 7,
                // @ts-expect-error
                id: 9,
                // @ts-expect-error
                text: 3,
                // @ts-expect-error
                isodate: 12,
            },
        ];
        const getSpy = jest.spyOn(axios, "get").mockResolvedValue({
            data: {
                rows: messages,
            },
        });

        const result = await fetchMessages("irrelevant-uri");

        expect(result).toEqual([
            {
                author: "5",
                country: "7",
                id: "9",
                text: "3",
                isodate: "12",
            },
        ]);
        expect(getSpy).toBeCalledWith("irrelevant-uri");
    });
});
