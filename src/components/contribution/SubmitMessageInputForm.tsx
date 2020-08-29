import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { IMessageContent } from "../../state/state/IMessage";
import { MapStateToProps } from "../../state/state/MapStateToProps";

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    input: {
        marginBottom: 8,
    },
    button: {
        marginTop: 8,
    },
});

interface Props {
    connectedToInternet: boolean;
    handleSubmit: (msg: IMessageContent) => void;
}

const SubmitMessageInputForm: FC<Props> = ({
    handleSubmit,
    connectedToInternet,
}) => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [country, setCountry] = useState("");
    const [textError, setTextError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const { t } = useTranslation();

    const resetInputs = () => {
        setText("");
        setAuthor("");
        setCountry("");
    };

    const commonProps = {
        mode: "outlined" as const,
        style: styles.input,
        underlineColorAndroid: "transparent",
        placeholderTextColor: "grey",
        autoCapitalize: "sentences" as const,
        accessibilityStates: {},
    };
    const missingInputs = !(text && author && country);
    const displayErrors = () => {
        if (!text) {
            setTextError(true);
        }
        if (!author) {
            setAuthorError(true);
        }
        if (!country) {
            setCountryError(true);
        }
    };
    const handleTextChanged = (str: string) => {
        setText(str);
        setTextError(false);
    };
    const handleAuthorChanged = (str: string) => {
        setAuthor(str);
        setAuthorError(false);
    };
    const handleCountryChanged = (str: string) => {
        setCountry(str);
        setCountryError(false);
    };
    const resetErrors = () => {
        setTextError(false);
        setAuthorError(false);
        setCountryError(false);
    };
    const onSubmit = () => {
        if (missingInputs) {
            displayErrors();
            return;
        }
        handleSubmit({ text, author, country });
        resetErrors();
        resetInputs();
    };

    return (
        <View style={styles.container}>
            <TextInput
                {...commonProps}
                label={t("contributeAwesomeMessage")}
                maxLength={200}
                onChangeText={handleTextChanged}
                value={text}
                error={textError}
            />
            <TextInput
                {...commonProps}
                label={t("contributeName")}
                maxLength={50}
                onChangeText={handleAuthorChanged}
                value={author}
                error={authorError}
            />
            <TextInput
                {...commonProps}
                label={t("contributeCountry")}
                maxLength={50}
                onChangeText={handleCountryChanged}
                value={country}
                error={countryError}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={onSubmit}
                disabled={!connectedToInternet}
                accessibilityStates={{}}
            >
                {t("contributeSubmit")}
            </Button>
        </View>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "connectedToInternet">> = (
    state
) => ({ connectedToInternet: state.network.connected });

export default connect(mapStateToProps)(SubmitMessageInputForm);
