import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { FullTheme } from "../../themes/theme";

interface Props {
    name: "share-alt" | "home" | "heart" | "star-o" | "cog";
    focused: boolean;
}

const TabBarIcon: FC<Props> = ({ name, focused }) => {
    const { colors } = useTheme() as FullTheme;

    return (
        <FontAwesome
            name={name}
            size={24}
            color={focused ? colors.navAccent : colors.disabled}
        />
    );
};

export default TabBarIcon;
