import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";
import { Route } from "../../navigation/Route";
import Layout from "../common/Layout";

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    text: {
        fontSize: 16,
    },
    button: { marginTop: 24 },
});

const EmptyMyContributionsScreen = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { goBack } = useNavigation();

    return (
        <Layout
            route={Route.MyContributions}
            title={t(Route.MyContributions)}
            appbarProps={{ onBack: goBack }}
        >
            <View style={styles.container}>
                <Paragraph style={styles.text}>
                    {t("myContributionsEmptyList")}
                </Paragraph>
                <Button
                    mode="outlined"
                    onPress={goBack}
                    accessibilityStates={{}}
                    style={styles.button}
                    icon={() => (
                        <FontAwesome5
                            name="share-alt"
                            size={20}
                            color={theme.colors.primary}
                        />
                    )}
                >
                    {t("myContributionsContribute")}
                </Button>
            </View>
        </Layout>
    );
};

export default EmptyMyContributionsScreen;
