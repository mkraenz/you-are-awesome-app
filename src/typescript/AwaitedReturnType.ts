/**
 * ReturnType for functions returning a promise after awaiting the function.
 *
 * Usage example:
 * const fn = () => Promise.resolve("Hi"); // fn: () => Promise<string>
 * const y: AwaitedReturnType<typeof fn>; // y: string
 */
export type AwaitedReturnType<
    X extends (...args: any) => Promise<any>
> = ReturnType<X> extends Promise<infer P> ? P : never;
