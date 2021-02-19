import { isEmpty } from "lodash";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
import DeleteConfirmationDialog from "../components/favorites/DeleteConfirmationDialog";
import EmptyFavoritesScreen from "../components/favorites/EmptyFavoritesScreen";
import ListItem from "../components/favorites/ListItem";
import { Route } from "../navigation/Route";
import { deleteFavorites } from "../state/action-creators/deleteFavorites";
import { IMessage } from "../state/state/IMessage";
import { MapStateToProps } from "../state/state/MapStateToProps";

interface Props {
    messages: IMessage[];
    deleteFavorites: typeof deleteFavorites;
}

const FavoritesScreen: FC<Props> = ({ messages, deleteFavorites }) => {
    const [selectModeEnabled, enableSelectMode] = useState(false);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [deleteConfirmationVisible, showDeleteConfirmation] = useState(false);
    const { t } = useTranslation();

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
        deleteFavorites(selectedItemIds, messages.length);
        resetSelection();
        hideDeleteConfirmation();
    };
    const showConfirmationDialog = () => {
        if (selectedItemIds.length > 0) {
            showDeleteConfirmation(true);
        }
    };

    if (isEmpty(messages)) {
        return <EmptyFavoritesScreen />;
    }

    return (
        <Layout
            route={Route.Favorites}
            title={t(Route.Favorites)}
            appbarProps={
                selectModeEnabled
                    ? {
                          onBack: resetSelection,
                          actionIcon: "delete-forever",
                          onActionPress: showConfirmationDialog,
                      }
                    : undefined
            }
            containerStyleOverwrites={{ paddingLeft: 0 }}
        >
            <FlatList
                data={messages}
                extraData={[]}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            {...item}
                            key={item.id}
                            onLongPress={() => {
                                Analytics.logDeleteMode(Route.Favorites);
                                select(item.id);
                            }}
                            onPressInSelectMode={() => select(item.id)}
                            selectMode={selectModeEnabled}
                            selected={selectedItemIds.includes(item.id)}
                        ></ListItem>
                    );
                }}
                ItemSeparatorComponent={() => <Divider />}
                onEndReachedThreshold={0.2}
                initialNumToRender={20}
            />
            <DeleteConfirmationDialog
                visible={deleteConfirmationVisible}
                onDismiss={hideDeleteConfirmation}
                onConfirm={deleteSelected}
            />
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "messages">> = (state) => ({
    messages: state.favorites.messages,
});

const mapDispatchToProps = { deleteFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
