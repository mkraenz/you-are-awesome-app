import { Language } from "../../localization/localization";

export interface IAppState {
    isDarkModeOn: boolean;
    pushNotificationsEnabled: boolean;
    pushNotificationsScheduledTime: Date;
    language: Language | null;
    analyticsEnabled: boolean;
    /** Whether this is the first time the app is being opened by the user after install from scratch */
    isFirstOpen: boolean;
}
