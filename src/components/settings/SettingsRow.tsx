import React, { FC, ReactNode } from "react";
import { List } from "react-native-paper";

const SettingsRow: FC<{
    onPress: () => void;
    title: string;
    rightComponent?: () => ReactNode;
    disabled?: boolean;
}> = ({ onPress, title, rightComponent, disabled }) => (
    <List.Item
        onPress={onPress}
        key={title}
        title={title}
        right={rightComponent}
        disabled={disabled}
    ></List.Item>
);

export default SettingsRow;
