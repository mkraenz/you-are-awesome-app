import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Paragraph, RadioButton, Subheading } from "react-native-paper";
import { IMessageContent } from "../../state/state/IMessage";

interface Props extends IMessageContent {
    isodate: string;
    onLongPress: () => void;
    onPressInSelectMode: () => void;
    selectMode: boolean;
    selected: boolean;
}

const styles = StyleSheet.create({
    description: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 10,
    },
    selectButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        maxWidth: "10%",
    },
});

const ListItem: FC<Props> = ({
    author,
    text,
    country,
    isodate,
    onLongPress,
    selectMode,
    selected,
    onPressInSelectMode,
}) => {
    const { t } = useTranslation();

    const maybeRenderSelectionIndicator = () => {
        if (selectMode) {
            return (
                <View style={styles.selectButtonContainer}>
                    <RadioButton.Android
                        accessibilityStates={{}}
                        value="first"
                        status={selected ? "checked" : "unchecked"}
                    />
                </View>
            );
        }
        return <></>;
    };
    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            onPress={selectMode ? onPressInSelectMode : undefined}
        >
            <List.Item
                accessibilityStates={{}}
                title={<Subheading>{text}</Subheading>}
                titleNumberOfLines={5}
                left={maybeRenderSelectionIndicator}
                description={() => (
                    <View style={styles.description}>
                        <Paragraph>
                            {author}
                            {t("from")}
                            {country}
                        </Paragraph>
                        <Paragraph style={styles.date}>{isodate}</Paragraph>
                    </View>
                )}
            ></List.Item>
        </TouchableOpacity>
    );
};
export default ListItem;
