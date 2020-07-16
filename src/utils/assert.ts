export const assert = (x: boolean | undefined | null, message?: string) => {
    if (!x) {
        throw new Error(message || "Assertion failed");
    }
};
