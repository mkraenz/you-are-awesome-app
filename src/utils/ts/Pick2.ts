import { ExpectSupertype } from "./Expect";

export type Pick2<T, K1 extends keyof T, K2 extends keyof T[K1]> = {
    [P1 in K1]: {
        [P2 in K2]: T[K1][P2];
    };
};

const unitTest1 = () => {
    type ObjWithSubProp = {
        sub: { subProp: string; anotherSubProp: number };
        sub2: { sub2Prop: object };
    };

    type Result = Pick2<ObjWithSubProp, "sub", "subProp">;

    type Expected = { sub: { subProp: string } };
    const condition: ExpectSupertype<Result, Expected> = true;
    const condition2: ExpectSupertype<Expected, Result> = true;
};
