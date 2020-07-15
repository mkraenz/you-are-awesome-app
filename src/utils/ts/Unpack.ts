import { ExpectSupertype } from "./Expect";

export type Unpack<A> = A extends Array<infer E> ? E : A;

const unitTest1 = () => {
    // it returns the internal type for an array type
    type PackedArray = { a: string; b: number }[];

    type Result = Unpack<PackedArray>;

    type Expected = { a: string; b: number };
    const condition: ExpectSupertype<Result, Expected> = true; // compiler will complain if not true
    const condition2: ExpectSupertype<Expected, Result> = true; // inclusion in both directions => equality
};

const unitTest2 = () => {
    // it returns the same type for a non-array type
    type PackedArray = { a: string; b: number };

    type Result = Unpack<PackedArray>;

    type Expected = { a: string; b: number };
    const condition: ExpectSupertype<Result, Expected> = true; // compiler will complain if not true
    const condition2: ExpectSupertype<Expected, Result> = true; // inclusion in both directions => equality
};
