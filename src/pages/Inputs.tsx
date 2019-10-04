import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    handleSubmit: (text: string) => void;
}
interface State {
    awesomeText: string;
}

class Inputs extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            awesomeText: "",
        };
    }

    private handleTextChanged(text: string) {
        this.setState({ awesomeText: text });
    }

    public render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    maxLength={200}
                    underlineColorAndroid="transparent"
                    placeholder="Your awesome message to the world"
                    placeholderTextColor="dimgrey"
                    autoCapitalize="none"
                    onChangeText={text => this.handleTextChanged(text)}
                    autoFocus={true}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() =>
                        this.props.handleSubmit(this.state.awesomeText)
                    }
                >
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
    },
    input: {
        margin: 15,
        paddingHorizontal: 5,
        height: 40,
        borderColor: "dodgerblue",
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: "dodgerblue",
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: "white",
    },
});

export default Inputs;
