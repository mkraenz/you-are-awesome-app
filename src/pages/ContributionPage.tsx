import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import uuid from "uuid";
import { IPostSendRequested } from "../redux/Actions";
import { IPost, IPostContent } from "../redux/IPost";
import { ReduxAction } from "../redux/ReduxAction";
import AddPostInput from "./AddPostInputs";
import { INavigationProps } from "./INavigationProps";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addPost: (post: IPost) => void;
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
                <AddPostInput
                    handleSubmit={(post: IPostContent) =>
                        this.handleSubmit(post)
                    }
                />
            </View>
        );
    }

    private handleSubmit(post: IPostContent) {
        this.props.addPost({
            ...post,
            id: uuid.v4(),
        });
        const sorry =
            "\n\nUnfortunately, we cannot save your contributions on the server yet because the app is still in early development. We are working on it and keep you updated!";
        // TODO #2 show spinner until the POST request was successful (or failed)
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome community. \n Your message: \n ${post.text}${sorry}`,
            [
                {
                    text: "Awesome!",
                    onPress: () => this.props.navigation.navigate("Home"),
                },
            ]
        );
    }
}

// not needed by component but app fails if not present
const mapStateToProps = (state: {}) => state;

const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, "addPost"> => ({
    addPost: (payload: IPost): IPostSendRequested =>
        dispatch({
            type: ReduxAction.PostSendRequested,
            payload,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContributionPage);
