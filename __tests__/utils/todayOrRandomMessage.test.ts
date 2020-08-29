import MockDate from "mockdate";
import { todaysMessageOrRandomMessage } from "../../src/utils/todayOrRandomMessage";
import { mock } from "../helpers/mocks";

afterEach(() => {
    MockDate.reset();
});

it("returns todays message if available", () => {
    MockDate.set(new Date(mock.messages[1].isodate));
    const result = todaysMessageOrRandomMessage(mock.messages);
    expect(result).toBe(mock.messages[1]);
});

it("returns random message if todays message unavailable", () => {
    MockDate.set(new Date("2000"));
    const result = todaysMessageOrRandomMessage(mock.messages);
    expect(mock.messages).toContain(result);
});
