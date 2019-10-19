import React, { SFC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    post: {
        text: string;
        author: string;
        country: string;
    };
}

const Balloon: SFC<Props> = props => (
    <View style={styles.balloon}>
        <Text style={styles.largeText}>{props.post.text}</Text>
        <Text style={styles.authorAndCountry}>
            {props.post.author} from {props.post.country}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    balloon: {
        marginTop: 5,
        padding: 15,
        borderRadius: 20,
        backgroundColor: "#1084ff",
    },
    authorAndCountry: {
        paddingTop: 5,
        color: "white",
        alignContent: "flex-end",
    },
    largeText: {
        paddingTop: 5,
        color: "white",
        fontSize: 32,
    },
});

export default Balloon;
