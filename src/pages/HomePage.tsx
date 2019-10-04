import casual from "casual-browserify";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
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
        this.fetchData();
        setInterval(() => this.setRandomText(), 10000);
    }

    public async fetchData() {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/proSingularity/you-are-awesome-app/"
        );
        const myJson = await response.json();
        console.log(JSON.stringify(myJson));
        this.setState({ author: JSON.stringify(myJson) });
    }

    public render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={
                        <HeaderTitle style={styles.header}>Home</HeaderTitle>
                    }
                ></Header>
                <View style={styles.textContainer}>
                    <View style={[localStyles.balloon]}>
                        <Text
                            style={{
                                paddingTop: 5,
                                color: "white",
                                fontSize: 32,
                            }}
                        >
                            {this.props.awesomeText}
                        </Text>

                        <Text
                            style={{
                                paddingTop: 5,
                                color: "white",
                                alignContent: "flex-end",
                            }}
                        >
                            {this.state.author} from {this.state.authorCountry}
                        </Text>
                    </View>
                </View>

                <Button
                    title="Share awesomeness"
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
    balloon: {
        marginTop: 5,
        padding: 15,
        borderRadius: 20,
        backgroundColor: "#1084ff",
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
