import React, { Component } from "react";
import { View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { INavigationProps } from "./INavigationProps";
import RefreshableHomePageMainView from "./RefreshableHomePageMainView";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    post: IPostContent;
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

                <RefreshableHomePageMainView />
                {/* <HomePageMainView post={this.props.post} /> */}
                <Button
                    title="Share awesomeness"
                    onPress={() => this.props.navigation.navigate("Contribute")}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: IReduxState): Pick<Props, "post"> => ({
    post: state.app.currentPost,
});

export default connect(mapStateToProps)(HomePage);
