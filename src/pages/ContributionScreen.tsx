import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import uuid from "uuid";
import { INavigationProps } from "./INavigationProps";
import Inputs from "./Inputs";
import { IPost, IPostContent } from "./IPost";
import { ReduxAction } from "./ReduxAction";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addAwesomeText: (post: IPost) => void;
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
                <Inputs
                    handleSubmit={(post: IPostContent) =>
                        this.handleSubmit(post)
                    }
                />
            </View>
        );
    }

    private handleSubmit(post: IPostContent) {
        this.props.addAwesomeText({
            ...post,
            id: uuid.v4(),
        });
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome contribution. \n Your message: \n ${post.text}`,
            [
                {
                    text: "Awesome!",
                    onPress: () => this.props.navigation.goBack(),
                },
            ]
        );
    }
}

const mapStateToProps = (state: never) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addAwesomeText: (post: IPost) =>
        dispatch({
            type: ReduxAction.AddPost,
            payload: post,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContributionScreen);
