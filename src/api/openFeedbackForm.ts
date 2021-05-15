import { Linking } from "react-native";
import { CONFIG } from "../config";
import { jsBuildNumber } from "../utils/version.json";
import { Analytics } from "./Analytics";

export const openFeedbackForm = () => {
    Analytics.logLinkFollow("feedbackForm");
    Linking.openURL(`${CONFIG.uri.feedbackForm}${jsBuildNumber}`);
};
