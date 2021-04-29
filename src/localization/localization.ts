import { Resource } from "i18next";
import { Route } from "../navigation/Route";

type keys =
    | "appTitle"
    | "darkMode"
    | "settings"
    | "language"
    | "sendAnalytics"
    // TODO IOS: currently always links to Google Play store
    | "rateTheApp"
    | "settingsGeneral"
    | "settingsFeedback"
    | "settingsPrivacy"
    | "settingsAbout"
    | "settingsDeveloper"
    | "settingsSubmitFeedback"
    | "copyright1"
    | "copyright2Company"
    | "copyright3"
    | "companyLink"
    | "comingSoon"
    | "noInternet"
    | "buildVersion"
    | "contributeAwesomeMessage"
    | "contributeAwesomeMessageLong"
    | "contributeCountry"
    | "contributeSubmit"
    | "contributeAgreeToConditions"
    | "contributeConditions"
    | "contributeConditionsLink"
    | "contributeAnd"
    | "contributePrivacyPolicy"
    | "contributeNavLabel"
    | "contributionStayTuned"
    | "contributionThanks"
    | "contributionMember"
    | "contributionAlertButton"
    | "contributeName"
    | "notificationsEnable"
    | "notificationsSetTime"
    | "privacyPolicyLink"
    | "viewInBrowser"
    | "privacyPolicy"
    | "from"
    | "favoritesEmptyList"
    | "favoritesToRoute"
    | "favoritesDeleteDialogTitle"
    | "favoritesDeleteDialogText"
    | "favoritesDelete"
    | "favoritesCancel"
    | "myContributionsContribute"
    | "myContributionsEmptyList"
    | "myContributionsDeleteDialogTitle"
    | "myContributionsDeleteDialogText"
    | "myContributionsDelete"
    | "myContributionsCancel"
    | "reportTitle"
    | "reportConfirmButton"
    | "reportCancelButton"
    | "reportReason"
    | "reportReasonSexual"
    | "reportReasonHateful"
    | "reportReasonInfringement"
    | "reportReasonDrugs"
    | "reportReasonPII"
    | "reportReasonOther"
    | "reportOtherComment"
    | "reportDescription"
    | "reportThankYouTitle"
    | "reportThankYouText"
    | "reportThankYouButton";

export interface ITranslations extends Resource {
    default: { [key in keys]: string } & { [key in Route]: string };
}

export enum Language {
    English = "en",
    German = "de",
    Japanese = "ja",
}

export enum LanguageCodeToLocalizedLang {
    en = "English",
    de = "Deutsch",
    ja = "日本語",
}

const shared = {
    companyLink: "http://kraenz.eu",
    appTitle: "You are Awesome App!",
};

const localization: {
    [locale in Language]: ITranslations;
} = {
    en: {
        default: {
            ...shared,
            darkMode: "Dark mode",
            settings: "Settings",
            comingSoon: "Coming soon",
            language: "Language",
            sendAnalytics: "Send usage statistics",
            rateTheApp: "Rate the App",
            settingsGeneral: "General",
            settingsFeedback: "Feedback",
            settingsPrivacy: "Privacy",
            settingsDeveloper: "Developer",
            settingsAbout: "About",
            settingsSubmitFeedback: "Provide feedback",
            copyright1: "Copyright © ",
            copyright2Company: "Kraenz Software Development",
            copyright3: "\nMirco Kraenz 2020",
            [Route.Home]: "Home",
            [Route.Settings]: "Settings",
            [Route.Contribute]: "Contribution",
            contributeNavLabel: "Contribute",
            [Route.MyContributions]: "My Contributions",
            [Route.PrivacyPolicy]: "Privacy Policy",
            [Route.Favorites]: "Favorites",
            [Route.DeveloperSettings]: "Experimental Settings",
            buildVersion: "Build v",
            noInternet: "Internet connection required",
            contributeAwesomeMessage: "Your Awesome Message",
            contributeAwesomeMessageLong: "Your awesome message to the world",
            contributeCountry: "Country",
            contributeName: "Nickname",
            contributeSubmit: "Submit",
            contributeAgreeToConditions: "I have read and agree to the ",
            contributeConditions: "Terms & Conditions",
            contributeConditionsLink:
                "https://you-are-awesome-app-terms-and-conditions.s3.eu-central-1.amazonaws.com/TermsAndConditionsEn.html",
            contributeAnd: " and ",
            contributePrivacyPolicy: "Privacy Policy",
            contributionStayTuned:
                "\n\nBecause of the limited amount of messages we can show, we select contributions by hand. With some luck, your awesome message will be chosen soon, too. So stay tuned! :)",
            contributionThanks: "Thanks for your contribution!",
            contributionMember:
                "You are a valued member of our awesome community.\nYour message:\n",
            contributionAlertButton: "Awesome!",
            notificationsEnable: "Daily notifications",
            notificationsSetTime: "Notification time",
            privacyPolicy: "Privacy Policy",
            viewInBrowser: "View in Web Browser",
            privacyPolicyLink:
                "https://you-are-awesome-app-privacy-policy.s3.eu-central-1.amazonaws.com/PrivacyPolicyEn.html",
            from: " from ",
            favoritesEmptyList:
                "Double tap your first awesome message in {{route}} to add it to your favorites.",
            favoritesToRoute: "Go to {{route}}",
            favoritesCancel: "Cancel",
            favoritesDelete: "Delete Forever",
            favoritesDeleteDialogText:
                "Deleting favorites is permanent and cannot be reverted.",
            favoritesDeleteDialogTitle: "Are you sure?",
            myContributionsContribute: "Contribute now",
            myContributionsEmptyList:
                "No contributions yet. Click below to share your first awesome message with the world. We are waiting for you. :)",
            myContributionsCancel: "Cancel",
            myContributionsDelete: "Delete Forever",
            myContributionsDeleteDialogText:
                "Deleting list items is permanent and cannot be reverted.\nNote that deletions do not affect server data. Deletions are only effective on your device.",
            myContributionsDeleteDialogTitle: "Are you sure?",
            reportCancelButton: "Cancel",
            reportConfirmButton: "Report",
            reportDescription: "Why do you find the content objectionable?",
            reportReason: "Reason",
            reportReasonSexual: "Sexual content",
            reportReasonHateful: "Hateful or abusive content",
            reportReasonInfringement: "Intellectual property infringement",
            reportReasonDrugs: "Relating to drugs or similar",
            reportReasonPII: "Personally identifiable information",
            reportReasonOther: "Other",
            reportOtherComment: "Details",
            reportTitle: "Report as inappropriate",
            reportThankYouButton: "Close",
            reportThankYouTitle: "Thanks for Reporting",
            reportThankYouText:
                "We are committed to protecting our users and others as well as their rights. We will check your report as soon as possible and take appropriate action.",
        },
    },
    de: {
        default: {
            ...shared,
            darkMode: "Nachtmodus",
            settings: "Einstellungen",
            comingSoon: "In Kürze verfügbar",
            language: "Sprache",
            sendAnalytics: "Nutzungsstatistiken senden",
            rateTheApp: "App bewerten",
            settingsGeneral: "Allgemein",
            settingsFeedback: "Feedback",
            settingsPrivacy: "Datenschutz",
            settingsDeveloper: "Entwickler",
            settingsAbout: "Über uns",
            settingsSubmitFeedback: "Feedback geben",
            copyright1: "Copyright © ",
            copyright2Company: "Kraenz Software Development",
            copyright3: "\nMirco Kraenz 2020",
            [Route.Home]: "Start",
            [Route.Settings]: "Einstellungen",
            [Route.Contribute]: "Teilen",
            contributeNavLabel: "Teilen",
            [Route.MyContributions]: "Meine Beiträge",
            [Route.PrivacyPolicy]: "Datenschutzerklärung",
            [Route.Favorites]: "Favoriten",
            [Route.DeveloperSettings]: "Experimentelle Einstellungen",
            buildVersion: "Programmversion ",
            noInternet: "Internetverbindung benötigt",
            contributeAwesomeMessage: "Deine Awesome Nachricht",
            contributeAwesomeMessageLong: "Deine awesome Nachricht an die Welt",
            contributeCountry: "Land",
            contributeName: "Spitzname",
            contributeSubmit: "Senden",
            contributeAgreeToConditions: "Ich verstehe und akzeptiere die ",
            contributeConditions: "Nutzungsbedingungen",
            contributeConditionsLink:
                "https://you-are-awesome-app-terms-and-conditions.s3.eu-central-1.amazonaws.com/TermsAndConditionsEn.html",
            contributeAnd: " und ",
            contributePrivacyPolicy: "Datenschutzerklärung",
            contributionStayTuned:
                "\n\nAufgrund der begrenzten Anzahl an Nachrichten, die wir jeden Tag zeigen können, wählen wir Beiträge per Hand aus. Mit ein wenig Glück ist deine Nachricht in Kürze für alle in der Community sichtbar. Freu dich darauf! :)",
            contributionThanks: "Danke für deinen Beitrag!",
            contributionMember:
                "Du bist ein wertvolles Mitglied unserer awesome Community.\nDeine Nachricht:\n",
            contributionAlertButton: "Awesome!",
            notificationsEnable: "Tägliche Benachrichtigungen",
            notificationsSetTime: "Benachrichtigung um",
            privacyPolicy: "Datenschutzerklärung (Englisch)",
            viewInBrowser: "Im Web Browser ansehen",
            privacyPolicyLink:
                "https://you-are-awesome-app-privacy-policy.s3.eu-central-1.amazonaws.com/PrivacyPolicyEn.html",
            from: " from ",
            favoritesEmptyList:
                "Doppeltippe deine erste awesome Nachricht im {{route}}bildschirm um sie zu deinen Favoriten hinzuzufügen.",
            favoritesToRoute: "Zu {{route}} wechseln",
            favoritesCancel: "Abbrechen",
            favoritesDelete: "Endgültig löschen",
            favoritesDeleteDialogText:
                "Das Löschen von Favoriten ist permanent und kann nicht rückgängig gemacht werden.",
            favoritesDeleteDialogTitle: "Bist du sicher?",
            myContributionsContribute: "Jetzt beitragen",
            myContributionsEmptyList:
                "Keine bisherigen Beiträge. Tippe auf den Knopf, um jetzt deine erste awesome Nachricht mit der Welt zu teilen. Wir warten schon auf dich. :)",
            myContributionsCancel: "Abbrechen",
            myContributionsDelete: "Endgültig löschen",
            myContributionsDeleteDialogText:
                "Das Löschen von Beiträge ist permanent und kann nicht rückgängig gemacht werden. Bitte beachte, dass keine Daten auf den Servern gelöscht werden. Nur Daten auf diesem Gerät werden gelöscht.",
            myContributionsDeleteDialogTitle: "Bist du sicher?",
            reportCancelButton: "Abbrechen",
            reportConfirmButton: "Melden",
            reportDescription: "Warum findest du diese Inhalte unangemessen?",
            reportReason: "Grund",
            reportReasonSexual: "Sexualle Inhalte",
            reportReasonHateful: "Missbrauch oder hasserfüllte Inhalte",
            reportReasonInfringement: "Verletzung geistigen Eigentums",
            reportReasonDrugs: "Drogen oder ähnliches betreffend",
            reportReasonPII: "Personenbezogene Informationen",
            reportReasonOther: "Andere",
            reportOtherComment: "Details",
            reportTitle: "Als unangemessen melden",
            reportThankYouButton: "Schließen",
            reportThankYouTitle: "Vielen Dank für die Meldung",
            reportThankYouText:
                "Wir sind stets bemüht unsere Nutzer und andere sowie deren Rechte zu schützen. Wir werden deine Meldung so schnell wie möglich prüfen und entsprechende Maßnahmen ergreifen.",
        },
    },
    ja: {
        default: {
            ...shared,
            darkMode: "ダークモード",
            settings: "設定",
            comingSoon: "近日公開",
            language: "言語",
            sendAnalytics: "利用状況の統計を送信する",
            rateTheApp: "このアプリをレビュー",
            settingsGeneral: "全般設定",
            settingsFeedback: "フィードバック",
            settingsPrivacy: "プライバシー設定",
            settingsDeveloper: "開発者設定",
            settingsAbout: "アプリについて",
            settingsSubmitFeedback: "フィードバックを提供",
            copyright1: "Copyright © ",
            copyright2Company: "Kraenz Software Development",
            copyright3: "\nMirco Kraenz 2020",
            [Route.Home]: "ホーム",
            [Route.Settings]: "設定",
            [Route.Contribute]: "シェア",
            contributeNavLabel: "シェア",
            [Route.MyContributions]: "自分の送信したすごいメッセージ",
            [Route.PrivacyPolicy]: "プライバシー ポリシー",
            [Route.Favorites]: "お気に入り",
            [Route.DeveloperSettings]: "実験的な設定",
            buildVersion: "ビルド v",
            noInternet: "インターネットに接続できませんでした",
            contributeAwesomeMessage: "すごいメッセージ",
            contributeAwesomeMessageLong:
                "世界の皆さんに伝いたいすごいメッセージ",
            contributeCountry: "国",
            contributeName: "ニックネーム",
            contributeSubmit: "送信",
            contributeAgreeToConditions: "利用条件に同意する。 ",
            contributeConditions: "利用条件へ",
            contributeConditionsLink:
                "https://you-are-awesome-app-terms-and-conditions.s3.eu-central-1.amazonaws.com/TermsAndConditionsEn.html",
            contributeAnd: "。",
            contributePrivacyPolicy: "プライバシー ポリシーへ",
            contributionStayTuned:
                "\n\n毎日一つのメッセージだけが表示されているため、届いたメッセージは手動で選択されています。運がよければあなたのメッセージももうすぐ選ばれるかもしれません。ということで、お楽しみに! (≧▽≦)",
            contributionMember:
                "私達のコミュニティーの大事な一員でいてくれてありがとうございます。\n送ったメッセージ:\n",
            contributionThanks: "参加してくれてありがとうございます。",
            contributionAlertButton: "素晴らしい",
            notificationsEnable: "プッシュ通知（毎日）",
            notificationsSetTime: "通知時間",
            privacyPolicy: "プライバシー ポリシー(英語)",
            viewInBrowser: "ブラウザーで表示",
            privacyPolicyLink:
                "https://you-are-awesome-app-privacy-policy.s3.eu-central-1.amazonaws.com/PrivacyPolicyEn.html",
            from: " from ",
            favoritesEmptyList:
                "{{route}}ですごいメッセージをダブルタップしてお気に入りに追加してみてください。",
            favoritesToRoute: "{{route}}へ",
            favoritesCancel: "キャンセル",
            favoritesDelete: "永久に削除",
            favoritesDeleteDialogText:
                "お気に入りのすごいメッセジを削除すると元に戻すことはできません。",
            favoritesDeleteDialogTitle: "削除確認",
            myContributionsContribute: "今すぐシェア",
            myContributionsEmptyList:
                "まだシェアしたメッセージはありません。今すぐ自分の初めてのすごいメッセージをシェアするため、下のボタンをタップしてください。",
            myContributionsCancel: "キャンセル",
            myContributionsDelete: "永久に削除",
            myContributionsDeleteDialogText:
                "削除すると元に戻すことはできません。サーバーに保存しているデータは消除されることはできません。このデバイスに保存しているのデータだけは消除されます。",
            myContributionsDeleteDialogTitle: "削除確認",
            reportCancelButton: "キャンセル",
            reportConfirmButton: "報告する",
            reportDescription: "なんでこのコンテンツは不適切だと思いますか？",
            reportReason: "理由",
            reportReasonSexual: "性的な内容",
            reportReasonHateful: "ひどい言葉、いやな言葉、侮辱的な言葉",
            reportReasonInfringement: "著作権侵害",
            reportReasonDrugs: "違法物質に関連する",
            reportReasonPII: "個人を特定できる情報",
            reportReasonOther: "その他",
            reportOtherComment: "詳細",
            reportTitle: "不適切として報告する",
            reportThankYouButton: "閉じる",
            reportThankYouTitle: "報告ありがとうございます",
            reportThankYouText:
                "You are Awesome App!では、ユーザーを含む皆様の保護に真剣に取り組んでいます。報告を出来るだけ早く確認し、適切な対応を行います。",
        },
    },
};
export default localization;
