import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import Balloon from "./components/Balloon";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    currentPost: IPostContent;
}

class HomePage extends Component<Props> {
    public render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={
                        <HeaderTitle style={styles.header}>Home</HeaderTitle>
                    }
                ></Header>
                <View style={localStyles.textContainer}>
                    <Balloon post={this.props.currentPost} />
                </View>

                <Button
                    title="Share awesomeness"
                    onPress={() => this.props.navigation.navigate("Contribute")}
                />
            </View>
        );
    }
}
const mapStateToProps = (state: IReduxState) => ({
    currentPost: state.app.currentPost,
    SERVER_URI: state.app.SERVER_URI,
});

export default connect(mapStateToProps)(HomePage);

/** global styles, use as defualts */
export const localStyles = StyleSheet.create({
    textContainer: {
        justifyContent: "center",
        padding: 20,
        flex: 1,
    },
});
