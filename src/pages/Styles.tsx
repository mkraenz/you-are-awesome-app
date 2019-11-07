import { StyleSheet } from "react-native";

export const lightBlue = "#89cff0";

/** global styles, use as defaults */
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue,
    },
    header: {
        color: "white",
    },
    buttonContainer: { padding: 10, marginHorizontal: 15 },
    button: { backgroundColor: "#2289dc" },
});
