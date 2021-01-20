import axios from "axios";
import { submitContribution } from "../../src/api/submitContribution";
import { mock } from "../helpers/mocks";

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

it("returns the response json body", async () => {
    const responseBody = { myData: "someValue" };
    const msg = {
        author: "my author",
        country: "my country",
        text: "my text",
        id: "id-123",
        isodate: "2014-01-23",
    };
    const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
        status: 201,
        data: responseBody,
    });

    const result = await submitContribution(msg, "irrelevant-uri");

    expect(result).toBe(responseBody);
    expect(postSpy).toHaveBeenCalledWith("irrelevant-uri", msg, {
        headers: {
            ["Content-Type"]: "application/json",
        },
        maxRedirects: 0,
    });
});

it("strips unnecessary props from the request body", async () => {
    const responseBody = { myData: "someValue" };
    const msgWithManyProps = {
        author: "my author",
        country: "my country",
        text: "my text",
        id: "id-123",
        isodate: "2014-01-23",
        hello: "abc",
        iamalsounnecessary: 1234,
    };
    const postSpy = jest.spyOn(axios, "post").mockResolvedValue({
        status: 201,
        data: responseBody,
    });

    const result = await submitContribution(msgWithManyProps, "irrelevant-uri");

    expect(result).toBe(responseBody);
    expect(postSpy).toHaveBeenCalledWith(
        "irrelevant-uri",
        {
            author: "my author",
            country: "my country",
            text: "my text",
            id: "id-123",
            isodate: "2014-01-23",
        },
        {
            headers: {
                ["Content-Type"]: "application/json",
            },
            maxRedirects: 0,
        }
    );
});

describe("feature flags", () => {
    it("does not send network requests and returns a mock response if disable flag set for all", async () => {
        const msg = {
            author: "random author",
            country: "random country",
            text: "random text",
            id: "id-1234567890",
            isodate: "2014-01-23",
        };
        const postSpy = jest.spyOn(axios, "post");

        const result = await submitContribution(msg, "irrelevant-uri", {
            all: true,
            submitContribution: false,
        });

        expect(result).toEqual(mock.message);
        expect(postSpy).not.toHaveBeenCalled();
    });

    it("does not send network requests and returns a mock response if disable flag set for this api", async () => {
        const msg = {
            author: "random author",
            country: "random country",
            text: "random text",
            id: "id-1234567890",
            isodate: "2014-01-23",
        };
        const postSpy = jest.spyOn(axios, "post");

        const result = await submitContribution(msg, "irrelevant-uri", {
            all: false,
            submitContribution: true,
        });

        expect(result).toEqual(mock.message);
        expect(postSpy).not.toHaveBeenCalled();
    });
});
