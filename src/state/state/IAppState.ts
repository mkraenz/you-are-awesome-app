import { Language } from "../../localization/localization";

export interface IAppState {
    isDarkModeOn: boolean;
    pushNotificationsEnabled: boolean;
    pushNotificationsScheduledTime: Date;
    language: Language | null;
    analyticsEnabled: boolean;
}
