import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Button, Paragraph, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import PushNotificationSettings from "../components/settings/PushNotificationSettings";
import type { LocalizationKeysOnboarding } from "../localization/localization";
import { toggleOnboardingCompleted } from "../state/action-creators/toggleFirstOpen";
import { IState } from "../state/state/IState";
import { FullTheme } from "../themes/theme";

const styles = StyleSheet.create({
    pushNotificationContainer: {
        width: "90%",
    },
    pushNotificationText: {
        textAlign: "center",
        padding: 12,
    },
    pushNotificationSideNote: {
        textAlign: "center",
        padding: 12,
        fontSize: 12,
    },
});

interface Props {
    finishOnboarding: () => void;
}

const OnboardingScreen: FC<Props> = ({ finishOnboarding }) => {
    const { t: _t } = useTranslation();
    const t = _t as (key: LocalizationKeysOnboarding) => string;
    const theme = useTheme() as FullTheme;
    const nothing = <></>;
    return (
        <Onboarding
            pages={[
                {
                    // TODO #527 make welcome look nice
                    backgroundColor: theme.colors.surface,
                    image: <View />, // TODO #527 logo
                    title: t("onboarding:welcomeTitle"),
                    subtitle: nothing,
                },
                {
                    backgroundColor: theme.colors.surface,
                    image: <View />, // intentionally show nothing
                    title: t("onboarding:pushNotifsTitle"),
                    subtitle: (
                        <>
                            <View style={styles.pushNotificationContainer}>
                                <Paragraph style={styles.pushNotificationText}>
                                    {t("onboarding:subtitleMain")}
                                </Paragraph>
                                <PushNotificationSettings />
                                {/* WONTFIX: in landscape mode, due to image container padding, this might not show up */}
                                <Paragraph
                                    style={styles.pushNotificationSideNote}
                                >
                                    {t("onboarding:subtitleNote")}
                                </Paragraph>
                            </View>
                        </>
                    ),
                },
            ]}
            nextLabel={<Button>{t("onboarding:next")}</Button>}
            showSkip={false}
            DoneButtonComponent={() => (
                <Button onPress={finishOnboarding}>
                    {t("onboarding:done")}
                </Button>
            )}
        />
    );
};

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps: Props = {
    // We assume Onboarding gets only shown with onboardingCompleted=false
    finishOnboarding: toggleOnboardingCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
