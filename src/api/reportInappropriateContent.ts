import Axios from "axios";
import { CONFIG } from "../config";
import { pick } from "../utils/pick";

const SUCCESS = 200;

export const reportInappropriateContent = async (report: {
    messageId: string;
    reason: string;
    comment: string;
}) => {
    const result = await Axios.post(
        CONFIG.uri.reportInappropriateContent,
        pick(report, ["messageId", "reason", "comment"]),
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    );
    if (result.status !== SUCCESS) {
        throw new Error(
            `Reporting inappropriate content failed. Response: ${JSON.stringify(
                result
            )}`
        );
    }
};
