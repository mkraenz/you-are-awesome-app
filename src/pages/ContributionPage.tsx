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
        const stayTuned =
            "\n\nBecause of the limited amount of messages we can show, we select contributions by hand. With some luck, your awesome message will be chosen soon, too. So stay tuned! :)";
        // TODO show spinner until the POST request was successful (or failed)
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
