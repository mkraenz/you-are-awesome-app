import * as FAnalytics from "expo-firebase-analytics";
import { CONFIG } from "../config";
import { Language } from "../localization/localization";
import { Route } from "../navigation/Route";

const analyticsDisabled = !CONFIG.featureFlags.analytics;

/**
 * Feature-flagged Adapter for Expo Firebase Analytics
 * Docs:
 * https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics#logEvent(java.lang.String,%20android.os.Bundle)
 *
 */
export class Analytics {
    static async setAnalyticsCollectionEnabled(enabled: boolean) {
        if (analyticsDisabled) return;
        await FAnalytics.setAnalyticsCollectionEnabled(enabled);
    }

    static async resetAnalyticsData() {
        if (analyticsDisabled) return;
        await FAnalytics.resetAnalyticsData();
    }

    static async logToggleAnalytics(enabled: boolean) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("toggle_analytics", { enabled });
    }

    static async logContribution(contributions: number) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("share", {
            type: "contribution",
            contributions,
        });
    }

    static async logDebug() {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("debug", {
            debugProps1: 123,
            debugProp2: "hallo",
        });
    }

    static async logLinkFollow(
        linkText: "privacyPolicy" | "company" | "termsAndConditions"
    ) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("link_follow", { linkText });
    }

    static async logLike(messageId: string) {
        await Analytics.logButtonPress("like", { messageId });
    }

    static async logPushNotifications(
        enabled: boolean,
        hour: number,
        min: number,
        timezone: string
    ) {
        await Analytics.logButtonPress("push_notifications", {
            enabled,
            hour,
            min,
            timezone,
        });
    }

    static async logDarkMode(enabled: boolean) {
        await Analytics.logButtonPress("dark_mode", { enabled });
    }

    static async logDelete(
        itemsDeleted: number,
        itemsLeft: number,
        screen: Route.MyContributions | Route.Favorites
    ) {
        await Analytics.logButtonPress("items_deleted", {
            itemsDeleted,
            itemsLeft,
            deletedAll: itemsLeft === 0,
            screen,
        });
    }
    static async logDeleteMode(
        screen: Route.MyContributions | Route.Favorites
    ) {
        await Analytics.logButtonPress("delete_mode", {
            screen,
        });
    }

    static async logCancel(purpose: string) {
        await Analytics.logButtonPress("cancel", { purpose });
    }

    static async logLanguage(language: Language | null) {
        await Analytics.logButtonPress("language", { language });
    }

    static async logManualRefresh() {
        await Analytics.logButtonPress("refresh", {});
    }

    /** NOTE: value must be a flat object, else it will be tracked as a useless [object Object] */
    private static async logButtonPress(type: string, value: object) {
        if (analyticsDisabled) return;
        await FAnalytics.logEvent("button_press", { type, ...value });
    }
}
