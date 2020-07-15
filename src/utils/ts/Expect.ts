export type ExpectSupertype<T, ExpectedT> = T extends ExpectedT ? true : never;

const negativeUnitTest = () => {
    // it errors on mismatch
    // @ts-expect-error
    const condition: ExpectSupertype<{ a: string }, { notA: string }> = true;
};

export type ExpectEquals<T, ExpectedT> = ExpectSupertype<T, ExpectedT> &
    ExpectSupertype<ExpectedT, T>;
const unitTestExpectSupertype = () => {
    const unitTest1 = () => {
        // it returns true for primitive type match
        const condition: ExpectSupertype<string, string> = true;
    };

    const unitTest2 = () => {
        // it returns true for interface type match
        const condition: ExpectSupertype<{ a: string }, { a: string }> = true;
    };

    const unitTest3 = () => {
        // it returns true for strict supertypes
        const condition: ExpectSupertype<
            { a: string; b: number },
            { a: string }
        > = true;
    };

    const unitTest4 = () => {
        // it errors on mismatch
        // @ts-expect-error
        const condition: ExpectSupertype<
            { a: string },
            { notA: string }
        > = true;
    };

    const unitTest5 = () => {
        // it errors for strict subtypes
        // @ts-expect-error
        const condition: ExpectSupertype<
            { a: string },
            { a: string; b: number }
        > = true;
    };
};

const unitTestExpectEquals = () => {
    const unitTest1 = () => {
        // it returns true for primitive type match
        const condition: ExpectEquals<string, string> = true;
    };

    const unitTest2 = () => {
        // it returns true for interface type match
        const condition: ExpectEquals<{ a: string }, { a: string }> = true;
    };

    const unitTest3 = () => {
        // it errors for strict supertypes
        // @ts-expect-error
        const condition: ExpectEquals<
            { a: string; b: number },
            { a: string }
        > = true;
    };
};
