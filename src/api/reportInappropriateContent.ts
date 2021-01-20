import Axios from "axios";
import { CONFIG } from "../config";
import { pick } from "../utils/pick";

type FeatureFlags = Pick<
    typeof CONFIG.disableApiCall,
    "all" | "reportInappropriateContent"
>;

export const reportInappropriateContent = async (
    report: {
        messageId: string;
        reason: string;
        comment: string;
    },
    disabledFlags: FeatureFlags = CONFIG.disableApiCall
) => {
    if (disabledFlags.all || disabledFlags.reportInappropriateContent) {
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
