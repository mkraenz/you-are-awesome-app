import { Unpack } from "./Unpack";

export type FirstParam<A extends (first: any, ...args: any) => any> = Unpack<
    Parameters<A>
>;

const unitTest = () => {
    type MyFunctionType = (x: { a: string }) => string;

    type Result = FirstParam<MyFunctionType>;

    type Expected = { a: string };
    type ExpectObjectStructure<A> = A extends Expected ? true : never;
    const condition: ExpectObjectStructure<Result> = true; // this line will fail
};
