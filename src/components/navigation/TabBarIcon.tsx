import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    icon: {
        marginBottom: -3,
    },
});

interface Props {
    name: string;
    focused: boolean;
}

const TabBarIcon: FC<Props> = ({ name, focused }) => {
    const { colors } = useTheme();

    return (
        <FontAwesome
            name={name}
            size={26}
            style={styles.icon}
            color={focused ? colors.accent : colors.disabled}
        />
    );
};

export default TabBarIcon;
