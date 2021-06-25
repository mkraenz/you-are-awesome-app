import { Linking } from "react-native";
import { CONFIG } from "../config";
import { jsBuildNumber } from "../utils/version.json";
import { Analytics } from "./Analytics";

export const openFeedbackForm = async () => {
    Analytics.logLinkFollow("feedbackForm");
    await Linking.openURL(`${CONFIG.uri.feedbackForm}${jsBuildNumber}`);
};
