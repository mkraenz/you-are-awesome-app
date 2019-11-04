import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import uuid from "uuid";
import { addPost } from "../redux/action-creators/addPost";
import { IPost, IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import AddPostInput from "./components/AddPostInputs";
import OfflineNotice from "./components/OfflineNotice";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addPost: (post: IPost) => void;
    connectedToInternet: boolean;
}

class ContributionPage extends Component<Props> {
    public render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name="arrow-back"
                            onPress={() => this.props.navigation.goBack()}
                            color={styles.header.color}
                        />
                    }
                    centerComponent={
                        <HeaderTitle style={styles.header}>
                            Contribute
                        </HeaderTitle>
                    }
                ></Header>
                {!this.props.connectedToInternet && <OfflineNotice />}
                <AddPostInput
                    handleSubmit={(post: IPostContent) =>
                        this.handleSubmit(post)
                    }
                />
            </View>
        );
    }

    private handleSubmit(post: IPostContent) {
        if (!this.props.connectedToInternet) {
            Alert.alert("No Internet Connection.");
            return;
        }
        this.props.addPost({
            ...post,
            id: uuid.v4(),
        });
        const stayTuned =
            "\n\nBecause of the limited amount of messages we can show, we select contributions by hand. With some luck, your awesome message will be chosen soon, too. So stay tuned! :)";
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome community. \n Your message: \n ${post.text}${stayTuned}`,
            [
                {
                    text: "Awesome!",
                    onPress: () => this.props.navigation.navigate("Home"),
                },
            ]
        );
    }
}

const mapStateToProps = (
    state: Pick<IReduxState, "netInfo">
): Pick<Props, "connectedToInternet"> => ({
    connectedToInternet: state.netInfo.connected,
});

const mapDispatchToProps: Pick<Props, "addPost"> = { addPost };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContributionPage);
