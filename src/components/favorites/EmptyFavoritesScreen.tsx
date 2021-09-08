import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";
import { Route } from "../../navigation/Route";
import { useTranslation } from "../../utils/useTranslation";
import Layout from "../common/Layout";

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    text: {
        fontSize: 16,
    },
    button: { marginTop: 24 },
});

const EmptyFavoritesScreen = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    return (
        <Layout route={Route.Favorites} title={t(Route.Favorites)}>
            <View style={styles.container}>
                <Paragraph style={styles.text}>
                    {t("favoritesEmptyList", { route: t(Route.Home) })}
                </Paragraph>
                <Button
                    mode="outlined"
                    onPress={() => navigate(Route.Home)}
                    style={styles.button}
                    icon={() => (
                        <MaterialCommunityIcons
                            name="home"
                            size={20}
                            color={theme.colors.primary}
                        />
                    )}
                >
                    {t("favoritesToRoute", { route: t(Route.Home) })}
                </Button>
            </View>
        </Layout>
    );
};

export default EmptyFavoritesScreen;
