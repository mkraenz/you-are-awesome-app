import { useTranslation as useTranslationOriginal } from "react-i18next";
import { LocalizationKeys } from "../localization/localization";

export const useTranslation = (
    ...args: Parameters<typeof useTranslationOriginal>
) => {
    const { t: _t, i18n } = useTranslationOriginal(...args);
    const t = _t as (key: LocalizationKeys, interpolation?: {}) => string;
    return { t, i18n };
};
