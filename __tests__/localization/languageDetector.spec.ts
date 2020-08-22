import { languageDetector } from "../../src/localization/languageDetector";

jest.mock("expo-localization", () => ({ locale: "mock-language" }));

it("detect() calls the callback with locale reported by expo", () => {
    const cb = jest.fn();

    languageDetector.detect(cb);

    expect(cb).toHaveBeenCalledWith("mock-language");
});
