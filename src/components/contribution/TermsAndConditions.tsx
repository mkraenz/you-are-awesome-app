import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";
import { Checkbox, List, Paragraph, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    link: { color: "blue", textDecorationLine: "underline" },
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

interface Props {
    accepted: boolean;
    handlePress: () => void;
    error: boolean;
}

// TODO #229 tests
const TermsAndConditions: FC<Props> = ({ accepted, handlePress, error }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const renderTitle = (
        <>
            <Paragraph style={error ? { color: colors.error } : {}}>
                {t("contributeAgreeToConditions")}
            </Paragraph>
            <Paragraph
                onPress={() => Linking.openURL(t("contributeConditionsLink"))}
                style={styles.link}
            >
                {t("contributeConditions")}
            </Paragraph>
        </>
    );
    const renderCheckbox = () => (
        // in case of multiline title, center the checkbox
        <View style={styles.checkboxContainer}>
            <Checkbox.Android
                accessibilityStates={{}}
                status={accepted ? "checked" : "unchecked"}
                onPress={handlePress}
                color={colors.primary}
                uncheckedColor={error ? colors.error : ""}
            />
        </View>
    );

    return (
        <List.Item
            accessibilityStates={{}}
            title={renderTitle}
            left={renderCheckbox}
            titleNumberOfLines={2}
        ></List.Item>
    );
};

export default TermsAndConditions;
