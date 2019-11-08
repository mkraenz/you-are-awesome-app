import React, { FC } from "react";
import { Header, Icon } from "react-native-elements";
import { HeaderTitle } from "react-navigation-stack";
import { INavigationProps } from "../INavigationProps";
import { styles } from "../Styles";

const SettingsHeader: FC<INavigationProps> = props => (
    <Header
        leftComponent={
            <Icon
                name="arrow-back"
                onPress={() => props.navigation.goBack()}
                color={styles.header.color}
            />
        }
        centerComponent={
            <HeaderTitle style={styles.header}>Settings</HeaderTitle>
        }
    ></Header>
);

export default SettingsHeader;
