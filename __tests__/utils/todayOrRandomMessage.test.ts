import { todaysMessageOrRandomMessage } from "../../src/utils/todayOrRandomMessage";
import { mock } from "../helpers/mocks";

it("returns todays message if available", () => {
    const result = todaysMessageOrRandomMessage(
        mock.messages,
        new Date(mock.messages[1].isodate)
    );
    expect(result).toBe(mock.messages[1]);
});

it("returns random message if todays message unavailable", () => {
    const result = todaysMessageOrRandomMessage(
        mock.messages,
        new Date("2000")
    );
    expect(mock.messages).toContain(result);
});
