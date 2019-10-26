import { fetchPosts } from "../../src/api/fetchPosts";
import { PostWithDate } from "../../src/redux/IPost";

describe("fetchPosts", () => {
    it("returns todays post if found", async () => {
        const isodate = "2016-01-01";
        const posts: PostWithDate[] = [
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
                    rows: posts,
                }),
            } as unknown) as Response)
        );

        const result = await fetchPosts(
            "irrelevant-uri",
            new Date(isodate),
            fetchMock
        );

        expect(result).toBe(posts[0]);
        expect(fetchMock).toBeCalledWith("irrelevant-uri");
    });

    it("returns a random post as fallback", async () => {
        const isodate = "2016-01-01";
        const differentIsodate = "2017-12-19";
        const posts: PostWithDate[] = [
            {
                author: "author-1",
                country: "country-1",
                id: "id-1",
                text: "text-1",
                isodate: differentIsodate,
            },
        ];

        const result = await fetchPosts("irrelevant", new Date(isodate), () =>
            Promise.resolve(({
                json: () => ({
                    rows: posts,
                }),
            } as unknown) as Response)
        );

        expect(result).toBe(posts[0]);
    });
});
