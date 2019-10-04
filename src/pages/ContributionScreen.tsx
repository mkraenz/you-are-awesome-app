import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { INavigationProps } from "./INavigationProps";
import Inputs from "./Inputs";
import { ReduxAction } from "./ReduxAction";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addAwesomeText: (text: string) => void;
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
                    handleSubmit={(text: string) => this.handleSubmit(text)}
                />
            </View>
        );
    }

    private handleSubmit(text: string) {
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome contribution. \n Your message: \n ${text}`,
            [
                {
                    text: "Awesome!",
                    onPress: () => {
                        this.props.addAwesomeText(text);
                        this.props.navigation.goBack();
                    },
                },
            ]
        );
    }
}

const mapStateToProps = (state: never) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addAwesomeText: (text: string) =>
        dispatch({ type: ReduxAction.AddAwesomeText, payload: { text } }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContributionScreen);
