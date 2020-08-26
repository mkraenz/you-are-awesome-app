import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Divider, Paragraph, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import ListItem from "../components/favorites/ListItem";
import { Route } from "../navigation/Route";
import { MessageWithDate } from "../state/state/IMessage";
import { MapStateToProps } from "../state/state/MapStateToProps";

const styles = StyleSheet.create({
    container: {},
    list: {},
    emptyListContainer: { height: "50%" },
    emptyListText: {
        fontSize: 16,
        marginTop: "auto",
    },
    emptyListButton: { marginTop: 24 },
    homeIcon: {},
});

interface Props {
    messages: MessageWithDate[];
}

const FavoritesScreen: FC<Props> = ({ messages }) => {
    const { t } = useTranslation();
    const nav = useNavigation();
    const theme = useTheme();
    if (isEmpty(messages)) {
        return (
            <Layout route={Route.Favorites}>
                <View style={styles.emptyListContainer}>
                    <Paragraph style={styles.emptyListText}>
                        {t("favoritesEmptyList", { route: t(Route.Home) })}
                    </Paragraph>
                    <Button
                        mode="outlined"
                        onPress={() => nav.navigate(Route.Home)}
                        accessibilityStates={{}}
                        style={styles.emptyListButton}
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
    }

    return (
        <Layout route={Route.Favorites}>
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    extraData={[]}
                    renderItem={({ item }) => {
                        return <ListItem {...item} key={item.id}></ListItem>;
                    }}
                    ItemSeparatorComponent={() => (
                        <Divider accessibilityStates={{}} />
                    )}
                    onEndReachedThreshold={0.2}
                    initialNumToRender={20}
                    style={styles.list}
                />
            </View>
        </Layout>
    );
};
const mapStateToProps: MapStateToProps<Pick<Props, "messages">> = (state) => ({
    messages: state.favorites.messages,
});

export default connect(mapStateToProps)(FavoritesScreen);
