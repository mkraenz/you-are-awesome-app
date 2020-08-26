import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { List, Paragraph, Subheading } from "react-native-paper";
import { IMessageContent } from "../../state/state/IMessage";

interface Props extends IMessageContent {
    isodate: string;
}

const styles = StyleSheet.create({
    icon: { transform: [{ scaleX: 2 }, { scaleY: 2 }] },
    rightComponentContainer: {
        marginTop: "auto",
        marginBottom: "auto",
    },
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
        <TouchableOpacity
            // TODO #211 removal
            onPress={() => console.log(text, author, country, isodate)}
        >
            <List.Item
                accessibilityStates={{}}
                title={<Subheading>{text}</Subheading>}
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
                // left={() => (
                //     <List.Icon icon={{ uri: "" }} style={styles.icon} />
                // )}
                // right={() => <Title>right</Title>}
            ></List.Item>
        </TouchableOpacity>
    );
};
export default ListItem;
