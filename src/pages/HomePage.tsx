import React, { Component } from "react";
import { View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { INavigationProps } from "./INavigationProps";
import RefreshableHomePage from "./RefreshableHomePage";
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

                <RefreshableHomePage />
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
});

export default connect(mapStateToProps)(HomePage);
