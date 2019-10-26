import { pickPostContent } from "../../src/utils/pickPostContent";
import { mock } from "../helpers/mocks";

it("pickPostContent() returns an exact IPostContent", () => {
    const moreThanPostContent = mock.post;

    const result = pickPostContent(moreThanPostContent);

    expect(result).toStrictEqual({
        author: moreThanPostContent.author,
        country: moreThanPostContent.country,
        text: moreThanPostContent.text,
    });
});
