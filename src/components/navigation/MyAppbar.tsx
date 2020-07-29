import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface Props {
    title: string;
    icon?: string;
}

const MyAppbar: FC<Props> = ({ title, icon = "menu" }) => {
    return (
        <Appbar.Header accessibilityStates={{}}>
            <Appbar.Content
                title={"You are Awesome App!"}
                style={{ alignItems: "center", display: "flex" }}
                accessibilityStates={{}}
            />
        </Appbar.Header>
    );
};

export default MyAppbar;
