import { Resource } from "i18next";
import { Route } from "../navigation/Route";

type keys =
    | "darkMode"
    | "settings"
    | "appTitle"
    | "language"
    | "copyright"
    | "noInternet"
    | "buildVersion"
    | "contributeAwesomeMessage"
    | "contributeAwesomeMessageLong"
    | "contributeCountry"
    | "contributeSubmit"
    | "contributionStayTuned"
    | "contributionThanks"
    | "contributionMember"
    | "contributionAlertButton"
    | "contributeName"
    | "notificationsEnable"
    | "notificationsSetTime";

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

const localization: {
    [locale in Language]: ITranslations;
} = {
    en: {
        default: {
            darkMode: "Dark mode",
            settings: "Settings",
            appTitle: "You are Awesome App!",
            language: "Language",
            copyright:
                "Copyright © Kraenz Software Development\nMirco Kraenz 2020",
            [Route.Home]: "Home",
            [Route.Settings]: "Settings",
            [Route.Contribute]: "Contribute",
            buildVersion: "Build version",
            noInternet: "No Internet Connection",
            contributeAwesomeMessage: "Your Awesome Message",
            contributeAwesomeMessageLong: "Your awesome message to the world",
            contributeCountry: "Country",
            contributeName: "Nickname",
            contributeSubmit: "Submit",
            contributionStayTuned:
                "\n\nBecause of the limited amount of messages we can show, we select contributions by hand. With some luck, your awesome message will be chosen soon, too. So stay tuned! :)",
            contributionThanks: "Thanks for your contribution!",
            contributionMember:
                "You are a valued member of our awesome community.\nYour message:\n",
            contributionAlertButton: "Awesome!",
            notificationsEnable: "Daily notifications",
            notificationsSetTime: "Notification time",
        },
    },
    de: {
        default: {
            darkMode: "Nachtmodus",
            settings: "Einstellungen",
            appTitle: "You are Awesome App!",
            language: "Sprache",
            copyright:
                "Copyright © Kraenz Software Development\nMirco Kraenz 2020",
            [Route.Home]: "Start",
            [Route.Settings]: "Einstellungen",
            [Route.Contribute]: "Teilen",
            buildVersion: "Programmversion",
            noInternet: "Keine Internetverbindung",
            contributeAwesomeMessage: "Deine Awesome Nachricht",
            contributeAwesomeMessageLong: "Deine awesome Nachricht an die Welt",
            contributeCountry: "Land",
            contributeName: "Spitzname",
            contributeSubmit: "Senden",
            contributionStayTuned:
                "\n\nAufgrund der begrenzten Anzahl an Nachrichten, die wir jeden Tag zeigen können, wählen wir Beiträge per Hand aus. Mit ein wenig Glück ist deine Nachricht in Kürze für alle in der Community sichtbar. Freu dich darauf! :)",
            contributionThanks: "Danke für deinen Beitrag!",
            contributionMember:
                "Du bist ein wertvolles Mitglied unserer awesome Community.\nDeine Nachricht:\n",
            contributionAlertButton: "Awesome!",
            notificationsEnable: "Tägliche Benachrichtigungen",
            notificationsSetTime: "Benachrichtigung um",
        },
    },
    ja: {
        default: {
            darkMode: "ダークモード",
            settings: "設定",
            appTitle: "You are Awesome App!",
            language: "言語",
            copyright:
                "Copyright © Kraenz Software Development\nMirco Kraenz 2020",
            [Route.Home]: "ホーム",
            [Route.Settings]: "設定",
            [Route.Contribute]: "シェア",
            buildVersion: "ビルドバージョン",
            noInternet: "インターネットに接続できませんでした",
            contributeAwesomeMessage: "すごいメッセージ",
            contributeAwesomeMessageLong:
                "世界の皆さんに伝いたいすごいメッセージ",
            contributeCountry: "国",
            contributeName: "ニックネーム",
            contributeSubmit: "送信",
            contributionStayTuned:
                "\n\n毎日一つのメッセージだけが表示されているため、届いたメッセージは手動で選択されています。運がよければあなたのメッセージももうすぐ選ばれるかもしれません。ということで、お楽しみに! (≧▽≦)",
            contributionMember:
                "私達のコミュニティーの大事な一員でいてくれてありがとうございます。\n送ったメッセージ:\n",
            contributionThanks: "参加してくれてありがとうございます。",
            contributionAlertButton: "素晴らしい",
            notificationsEnable: "プッシュ通知（毎日）",
            notificationsSetTime: "通知時間",
        },
    },
};
export default localization;
