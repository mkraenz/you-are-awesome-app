import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface Props {
    title: string;
    icon?: string;
}

const MyAppbar: FC<Props> = ({ title, icon = "menu" }) => {
    return (
        <Appbar.Header>
            <Appbar.Action icon={icon} onPress={() => undefined} />
            <Appbar.Content title={title} />
            <Appbar.Action icon="magnify" onPress={() => undefined} />
            <Appbar.Action icon="dots-vertical" onPress={() => undefined} />
        </Appbar.Header>
    );
};

export default MyAppbar;
