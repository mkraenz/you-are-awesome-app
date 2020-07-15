import { assert } from "../../src/utils/assert";

describe("assert(..)", () => {
    const falsyInputs = [false, undefined, null];
    falsyInputs.forEach((falsyInput) =>
        it(`throws for input ${falsyInput}`, () => {
            expect(() => assert(falsyInput)).toThrowError(/Assertion failed/);
        })
    );

    it("does nothing on truthy input", () => {
        expect(assert(true)).toBe(undefined);
    });
});
