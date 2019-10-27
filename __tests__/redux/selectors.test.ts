import { backoffInMs } from "../../src/redux/selectors";

it("backoffInMs returns backoff", () => {
    const state = {
        networking: { backoffInMs: 1337 },
    };

    const result = backoffInMs(state);

    expect(result).toBe(1337);
});
