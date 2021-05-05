import { Linking } from "react-native";
import { Analytics } from "../../src/api/Analytics";
import { openFeedbackForm } from "../../src/api/openFeedbackForm";

jest.mock("expo-firebase-analytics", () => ({ logEvent: jest.fn() }));

let linkingMock: jest.SpyInstance<Promise<any>, [url: string]>;

beforeEach(() => {
    linkingMock = jest
        .spyOn(Linking, "openURL")
        .mockResolvedValueOnce(undefined);
});

it("opens the URL", () => {
    openFeedbackForm();

    const urlWithBuildVersion = new RegExp(
        /https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSdheSDuk56z1NaNVjDIaDLpiO4GZj2ZXcoHlQxIIpRREFioTA\/viewform\?usp=pp_url&entry\.809955830=\d+/
    );
    expect(linkingMock).toHaveBeenCalledWith(
        expect.stringMatching(urlWithBuildVersion)
    );
});

it("submits analytics", () => {
    const analyticsSpy = jest.spyOn(Analytics, "logLinkFollow");

    openFeedbackForm();

    expect(analyticsSpy).toHaveBeenCalledWith("feedbackForm");
});
