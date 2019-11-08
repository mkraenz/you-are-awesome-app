import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import { IPostContent } from "../../redux/IPost";

interface Props {
    handleSubmit: (post: IPostContent) => void;
}
interface State {
    text: string;
    author: string;
    country: string;
}

class AddPostInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = getEmptyState();
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
                    placeholderTextColor="grey"
                    autoCapitalize="sentences"
                    onChangeText={text => this.handleTextChanged(text)}
                />
                <Input
                    label="First Name"
                    labelStyle={styles.inputLabel}
                    maxLength={50}
                    underlineColorAndroid="transparent"
                    placeholder="First name"
                    placeholderTextColor="grey"
                    autoCapitalize="words"
                    onChangeText={text => this.handleAuthorChanged(text)}
                />
                <Input
                    label="Country"
                    labelStyle={styles.inputLabel}
                    maxLength={50}
                    underlineColorAndroid="transparent"
                    placeholder="Country"
                    placeholderTextColor="grey"
                    autoCapitalize="sentences"
                    onChangeText={text => this.handleCountryChanged(text)}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        this.props.handleSubmit({ ...this.state });
                        this.handleSubmitAdditional();
                    }}
                >
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        );
    }

    private handleSubmitAdditional() {
        this.setState(getEmptyState());
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
    },
    inputLabel: {
        marginTop: 10,
        color: "dimgrey",
    },
    submitButton: {
        backgroundColor: "#2289dc",
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: "white",
        textAlign: "center",
    },
});

const getEmptyState = (): State => ({
    text: "",
    author: "",
    country: "",
});

export default AddPostInput;
