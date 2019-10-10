import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { IPostContent } from "../redux/IPost";

interface Props {
    handleSubmit: (post: IPostContent) => void;
}
interface State {
    text: string;
    author: string;
    country: string;
}

class Inputs extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: "",
            author: "",
            country: "",
        };
    }

    private handleTextChanged(text: string) {
        this.setState({ text: text });
    }

    private handleAuthorChanged(author: string) {
        this.setState({ author });
    }

    private handleCountryChanged(country: string) {
        this.setState({ country });
    }

    public render() {
        return (
            <View style={styles.container}>
                <Input
                    label="Awesome message"
                    labelStyle={styles.inputLabel}
                    maxLength={200}
                    underlineColorAndroid="transparent"
                    placeholder="Your awesome message to the world"
                    placeholderTextColor="dimgrey"
                    autoCapitalize="sentences"
                    onChangeText={text => this.handleTextChanged(text)}
                />
                <Input
                    label="First Name"
                    labelStyle={styles.inputLabel}
                    maxLength={50}
                    underlineColorAndroid="transparent"
                    placeholder="First name"
                    placeholderTextColor="dimgrey"
                    autoCapitalize="words"
                    onChangeText={text => this.handleAuthorChanged(text)}
                />
                <Input
                    label="Country"
                    labelStyle={styles.inputLabel}
                    maxLength={50}
                    underlineColorAndroid="transparent"
                    placeholder="Country"
                    placeholderTextColor="dimgrey"
                    autoCapitalize="sentences"
                    onChangeText={text => this.handleCountryChanged(text)}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.props.handleSubmit({ ...this.state })}
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
    inputLabel: { marginTop: 10 },
    submitButton: {
        backgroundColor: "dodgerblue",
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: "white",
        textAlign: "center",
    },
});

export default Inputs;
