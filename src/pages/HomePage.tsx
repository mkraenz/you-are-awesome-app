import React, { Component } from "react";
import { View } from "react-native";
import { Button, Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Navigation } from "../Navigation";
import { IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import OfflineNotice from "./components/OfflineNotice";
import RefreshableHomePageMainView from "./components/RefreshableHomePageMainView";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    post: IPostContent;
    connectedToInternet: boolean;
}

class HomePage extends Component<Props> {
    public render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={
                        <HeaderTitle style={styles.header}>Home</HeaderTitle>
                    }
                    rightComponent={
                        <Icon
                            name="settings"
                            onPress={() =>
                                this.props.navigation.navigate(
                                    Navigation.Settings
                                )
                            }
                            color={styles.header.color}
                        />
                    }
                ></Header>
                {this.shouldBeLoading() && <OfflineNotice />}

                <RefreshableHomePageMainView />
                <Button
                    title="Share awesomeness"
                    onPress={() =>
                        this.props.navigation.navigate(Navigation.Contribute)
                    }
                />
            </View>
        );
    }

    private shouldBeLoading() {
        return (
            !this.props.connectedToInternet &&
            this.props.post.text === "Loading..." // slightly hacky
        );
    }
}

const mapStateToProps = (state: IReduxState): Omit<Props, "navigation"> => ({
    post: state.app.currentPost,
    connectedToInternet: state.netInfo.connected,
});

export default connect(mapStateToProps)(HomePage);
