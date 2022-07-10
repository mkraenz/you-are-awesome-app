import Axios from "axios";
import { ApiFeatureFlags, CONFIG } from "../config";
import { pick } from "../utils/pick";

export const reportInappropriateContent = async (
    report: {
        messageId: string;
        reason: string;
        comment: string;
    },
    disabledFlags: ApiFeatureFlags<"reportInappropriateContent"> = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.reportInappropriateContent) {
        if (process.env.NODE_ENV !== "test")
            console.log(
                "API call reportInappropriateContent disabled. Skipping"
            );
        return;
    }
    const payload = pick(report, ["messageId", "reason", "comment"]);
    await Axios.post(CONFIG.uri.reportInappropriateContent, payload, opts);
};

const opts = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};
