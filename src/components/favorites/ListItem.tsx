import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";
import { IMessageContent } from "../../state/state/IMessage";

interface Props extends IMessageContent {
    isodate: string;
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
});

const ListItem: FC<Props> = ({ author, text, country, isodate }) => {
    const { t } = useTranslation();

    return (
        <List.Item
            accessibilityStates={{}}
            title={<Subheading>{text}</Subheading>}
            titleNumberOfLines={5}
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
    );
};
export default ListItem;
