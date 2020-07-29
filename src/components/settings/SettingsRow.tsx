import React, { FC, ReactNode } from "react";
import { List, useTheme } from "react-native-paper";
import { FullTheme } from "../../themes/theme";

const SettingsRow: FC<{
    onPress: () => void;
    title: string;
    rightComponent?: (disabledStyle: { color?: string }) => () => ReactNode;
    disabled?: boolean;
}> = ({ onPress, title, rightComponent, disabled }) => {
    const theme = useTheme() as FullTheme;
    const disabledStyle = disabled ? { color: theme.colors.disabled } : {};
    return (
        <List.Item
            onPress={onPress}
            key={title}
            title={title}
            right={rightComponent && rightComponent(disabledStyle)}
            disabled={disabled}
            titleStyle={disabledStyle}
            accessibilityStates={{}}
        ></List.Item>
    );
};

export default SettingsRow;
