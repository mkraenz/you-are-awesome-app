import React from "react";
import { StyleSheet, View } from "react-native";
import { IPostContent } from "../../redux/IPost";
import Balloon from "./Balloon";

interface Props {
    post: IPostContent;
}

const HomePageMainView = (props: Props) => (
    <View style={localStyles.textContainer}>
        <Balloon post={props.post} />
    </View>
);

const localStyles = StyleSheet.create({
    textContainer: {
        justifyContent: "center",
        padding: 20,
        flex: 1,
    },
});

export default HomePageMainView;
