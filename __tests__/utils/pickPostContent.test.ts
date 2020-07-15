import { pickMessageContent } from "../../src/utils/pickPostContent";
import { mock } from "../helpers/mocks";

it("pickMessageContent() returns an exact IMessageContent", () => {
    const tooMuch = mock.message;

    const result = pickMessageContent(tooMuch);

    expect(result).toStrictEqual({
        author: tooMuch.author,
        country: tooMuch.country,
        text: tooMuch.text,
    });
});
