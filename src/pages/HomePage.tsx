import casual from "casual-browserify";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { randomAwesomeText } from "../content/awesomeTexts";
import { INavigationProps } from "./INavigationProps";
import { ReduxAction } from "./ReduxAction";
import { styles } from "./Styles";

interface Props extends INavigationProps {
    awesomeText: string;
    randomizeAwesomeText: () => void;
}

interface State {
    author: string;
    authorCountry: string;
}

class HomePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            author: "",
            authorCountry: "",
        };
    }

    public componentDidMount() {
        // casual lib probably gets loaded async
        this.setRandomText();
        setInterval(() => this.setRandomText(), 10000);
    }

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.awesomeText}>
                        {this.props.awesomeText}
                    </Text>
                    <Text style={localStyles.authorText}>
                        {this.state.author} from {this.state.authorCountry}
                    </Text>
                </View>
                <Button
                    title="Add"
                    onPress={() =>
                        this.props.navigation.navigate("AddAwesomeTextModal")
                    }
                />
            </View>
        );
    }

    private setRandomText() {
        this.props.randomizeAwesomeText();
        this.setState({
            author: `${casual.first_name} ${casual.last_name}`,
            authorCountry: casual.country,
        });
    }
}

const localStyles = StyleSheet.create({
    authorText: {
        fontSize: 24,
    },
});

const mapStateToProps = (state: { currentAwesomeText: string }) => ({
    awesomeText: state.currentAwesomeText,
});

const mapDispatcherToProps = (dispatch: Dispatch) => ({
    randomizeAwesomeText: () =>
        dispatch({
            type: ReduxAction.SetAwesomeText,
            payload: { text: randomAwesomeText() },
        }),
});

export default connect(
    mapStateToProps,
    mapDispatcherToProps
)(HomePage);
