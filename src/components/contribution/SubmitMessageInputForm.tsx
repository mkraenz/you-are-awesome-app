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
    return (
        <View style={styles.container}>
            <TextInput
                {...commonProps}
                label={t("contributeAwesomeMessage")}
                maxLength={200}
                placeholder={t("contributeAwesomeMessageLong")}
                onChangeText={setText}
                value={text}
            />
            <TextInput
                {...commonProps}
                label={t("contributeName")}
                maxLength={50}
                placeholder={t("contributeName")}
                onChangeText={setAuthor}
                value={author}
            />
            <TextInput
                {...commonProps}
                label={t("contributeCountry")}
                maxLength={50}
                onChangeText={setCountry}
                value={country}
                placeholder={t("contributeCountry")}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                    handleSubmit({ text, author, country });
                    resetInputs();
                }}
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
