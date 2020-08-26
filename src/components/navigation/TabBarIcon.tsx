import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";

interface Props {
    name: string;
    focused: boolean;
}

const TabBarIcon: FC<Props> = ({ name, focused }) => {
    const { colors } = useTheme();

    return (
        <FontAwesome
            name={name}
            size={24}
            color={focused ? colors.accent : colors.disabled}
        />
    );
};

export default TabBarIcon;
