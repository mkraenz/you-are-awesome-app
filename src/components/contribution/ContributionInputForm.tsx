import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { IMessageContent } from "../../state/state/IMessage";
import { MapStateToProps } from "../../state/state/MapStateToProps";
import { Color } from "../../themes/theme";
import TermsAndConditions from "./TermsAndConditions";

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

const ContributionInputForm: FC<Props> = ({
    handleSubmit,
    connectedToInternet,
}) => {
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [country, setCountry] = useState("");
    const [conditionsAccepted, acceptConditions] = useState(false);
    const [textError, setTextError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [conditionsError, setConditionsError] = useState(false);
    const { t } = useTranslation();
    const { dark } = useTheme();

    const resetInputs = () => {
        setText("");
        setAuthor("");
        setCountry("");
        acceptConditions(false);
    };

    const commonProps = {
        mode: "outlined" as const,
        style: styles.input,
        underlineColorAndroid: "transparent",
        placeholderTextColor: Color.LightGrey,
        autoCapitalize: "sentences" as const,
        accessibilityStates: {},
    };
    const missingInputs = !(text && author && country && conditionsAccepted);
    const displayErrors = () => {
        if (!text) setTextError(true);
        if (!author) setAuthorError(true);
        if (!country) setCountryError(true);
        if (!conditionsAccepted) setConditionsError(true);
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
    const handleConditionsChecked = () => {
        acceptConditions(!conditionsAccepted);
        setConditionsError(false);
    };
    const resetErrors = () => {
        setTextError(false);
        setAuthorError(false);
        setCountryError(false);
        setConditionsError(false);
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
            <TermsAndConditions
                accepted={conditionsAccepted}
                error={conditionsError}
                handlePress={handleConditionsChecked}
            />
            <Button
                mode={dark ? "outlined" : "contained"}
                style={styles.button}
                onPress={onSubmit}
                disabled={!connectedToInternet}
            >
                {t("contributeSubmit")}
            </Button>
        </View>
    );
};

const mapStateToProps: MapStateToProps<Pick<Props, "connectedToInternet">> = (
    state
) => ({ connectedToInternet: state.network.connected });

export default connect(mapStateToProps)(ContributionInputForm);
