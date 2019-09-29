import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { INavigationProps } from "./INavigationProps";
import Inputs from "./Inputs";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    addAwesomeText: (text: string) => void;
}

interface State {
    mirroredText: string;
}

export default class ContributionScreen extends Component<Props, State> {
    public render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name="arrow-back"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                ></Header>
                <Inputs />
            </View>
        );
    }

    private handleSubmit(text: string) {
        Alert.alert(
            "Thanks for your contribution!",
            `You are a valued member of our awesome contribution. \n Your message: \n ${text}`
        );
        this.props.addAwesomeText(text);
        this.props.navigation.goBack();
    }
}
