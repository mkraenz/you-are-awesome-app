import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    Divider,
    Paragraph,
    Portal,
    useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import Layout from "../components/common/Layout";
import ListItem from "../components/favorites/ListItem";
import { Route } from "../navigation/Route";
import { deleteFavorites } from "../state/action-creators/deleteFavorites";
import { IMessage } from "../state/state/IMessage";
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
    messages: IMessage[];
    deleteFavorites: typeof deleteFavorites;
}

// TODO #245 split into nonempty fav screen and empty fav screen + top level component or at least the non-empty list in separate component
const FavoritesScreen: FC<Props> = ({ messages, deleteFavorites }) => {
    const [selectModeEnabled, enableSelectMode] = useState(false);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [deleteConfirmationVisible, showDeleteConfirmation] = useState(false);

    const select = (id: string) => {
        enableSelectMode(true);
        const selected = selectedItemIds.includes(id);
        if (selected) {
            const idsWithoutParamId = selectedItemIds.filter((s) => s !== id);
            setSelectedItemIds(idsWithoutParamId);
        } else {
            setSelectedItemIds([...selectedItemIds, id]);
        }
    };
    const resetSelection = () => {
        enableSelectMode(false);
        setSelectedItemIds([]);
    };
    const hideDeleteConfirmation = () => showDeleteConfirmation(false);
    const deleteSelected = () => {
        deleteFavorites(selectedItemIds);
        resetSelection();
        hideDeleteConfirmation();
    };

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

    const DeleteConfirmationDialog = () => (
        <Portal>
            <Dialog
                visible={deleteConfirmationVisible}
                onDismiss={hideDeleteConfirmation}
            >
                <Dialog.Title accessibilityStates={{}}>
                    {t("favoritesDeleteDialogTitle")}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{t("favoritesDeleteDialogText")}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={hideDeleteConfirmation}
                        accessibilityStates={{}}
                    >
                        {t("favoritesCancel")}
                    </Button>
                    <Button onPress={deleteSelected} accessibilityStates={{}}>
                        {t("favoritesDelete")}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

    return (
        // TODO #245 consider custom style for the left margin in selectMode
        <Layout
            route={Route.Favorites}
            appbarProps={
                selectModeEnabled
                    ? {
                          onBack: resetSelection,
                          actionIcon: "delete-forever",
                          onActionPress: () => showDeleteConfirmation(true),
                      }
                    : undefined
            }
        >
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    extraData={[]}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                {...item}
                                key={item.id}
                                onLongPress={() => select(item.id)}
                                onPressInSelectMode={() => select(item.id)}
                                selectMode={selectModeEnabled}
                                selected={selectedItemIds.includes(item.id)}
                            ></ListItem>
                        );
                    }}
                    ItemSeparatorComponent={() => (
                        <Divider accessibilityStates={{}} />
                    )}
                    onEndReachedThreshold={0.2}
                    initialNumToRender={20}
                    style={styles.list}
                />
                <DeleteConfirmationDialog />
            </View>
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "messages">> = (state) => ({
    messages: state.favorites.messages,
});

const mapDispatchToProps = { deleteFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
