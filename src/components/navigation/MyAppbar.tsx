import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

interface Props {
    title: string;
    icon?: string;
}

const MyAppbar: FC<Props> = ({ title, icon = "menu" }) => {
    const { t } = useTranslation();
    return (
        <Appbar.Header accessibilityStates={{}}>
            <Appbar.Content
                title={title}
                style={{ alignItems: "center", display: "flex" }}
                accessibilityStates={{}}
            />
        </Appbar.Header>
    );
};

export default MyAppbar;
