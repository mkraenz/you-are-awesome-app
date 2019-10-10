import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import uuid from "uuid";
import { IAddPost } from "../redux/Actions";
import { IPost, IPostContent } from "../redux/IPost";
import { IReduxState } from "../redux/IReduxState";
import { ReduxAction } from "../redux/ReduxAction";
import { INavigationProps } from "./INavigationProps";
import AddPostInput from "./AddPostInputs";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addPost: (post: IPost) => void;
}

interface State {
    mirroredText: string;
}

class ContributionScreen extends Component<Props, State> {
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
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome community. \n Your message: \n ${post.text}`,
            [
                {
                    text: "Awesome!",
                    onPress: () => this.props.navigation.navigate("Home"),
                },
            ]
        );
    }
}

const mapStateToProps = (state: IReduxState) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addPost: (payload: IPost): IAddPost =>
        dispatch({
            type: ReduxAction.AddPost,
            payload,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContributionScreen);
