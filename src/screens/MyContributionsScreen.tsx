import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import { Analytics } from "../api/Analytics";
import Layout from "../components/common/Layout";
import EmptyMyContributionsScreen from "../components/contribution/EmptyMyContributionsScreen";
import DeleteConfirmationDialog from "../components/favorites/DeleteConfirmationDialog";
import ListItem from "../components/favorites/ListItem";
import { Route } from "../navigation/Route";
import { deleteMyContributions } from "../state/action-creators/deleteMyContributions";
import { IMessage } from "../state/state/IMessage";
import { MapStateToProps } from "../state/state/MapStateToProps";

interface Props {
    messages: IMessage[];
    deleteMyContributions: typeof deleteMyContributions;
}

const MyContributionsScreen: FC<Props> = ({
    messages,
    deleteMyContributions,
}) => {
    const [selectModeEnabled, enableSelectMode] = useState(false);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [deleteConfirmationVisible, showDeleteConfirmation] = useState(false);
    const { t } = useTranslation();
    const { goBack } = useNavigation();

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
        deleteMyContributions(selectedItemIds, messages.length);
        resetSelection();
        hideDeleteConfirmation();
    };
    const showConfirmationDialog = () => {
        if (selectedItemIds.length > 0) {
            showDeleteConfirmation(true);
        }
    };

    if (isEmpty(messages)) {
        return <EmptyMyContributionsScreen />;
    }

    return (
        <Layout
            route={Route.MyContributions}
            title={t(Route.MyContributions)}
            appbarProps={
                selectModeEnabled
                    ? {
                          onBack: resetSelection,
                          actionIcon: "delete-forever",
                          onActionPress: showConfirmationDialog,
                      }
                    : { onBack: goBack }
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
                                Analytics.logDeleteMode(Route.MyContributions);
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
                route="myContributions"
            />
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "messages">> = (state) => ({
    messages: state.contributions.myMessages,
});

const mapDispatchToProps = { deleteMyContributions };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyContributionsScreen);
