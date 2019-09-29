import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { styles } from "../Styles";

interface Props {
    onTextChanged: (text: string) => void;
}

export default function AwesomeTextInput(props: Props) {
    const [value, onChangeText] = React.useState("");

    return (
        <TextInput
            style={[styles.awesomeText, localStyle.textInput]}
            placeholder="Tell somebody how awesome that person is."
            onChangeText={text => {
                onChangeText(text);
                props.onTextChanged(text);
            }}
            value={value}
        />
    );
}

const localStyle = StyleSheet.create({
    textInput: { borderWidth: 1 },
});
