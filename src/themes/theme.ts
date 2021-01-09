import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "react-native-paper";

type NavigationTheme = typeof NavDarkTheme | typeof NavDefaultTheme;

export type FullTheme = typeof DefaultTheme &
    NavigationTheme & {
        colors: {
            accentedCard: string;
            disabledItemText: string;
            navAccent: string;
        };
    };

export enum Color {
    LightBlue = "#89cff0",
    Blue = "#1084ff",
    Violet = "#4e148c",
    DarkTurquoise = "#00DAC6",
    DarkGrey = "#202c39",
    Grey = "#272727",
    LightGrey = "grey",
    White = "white",
}

export const lightTheme: FullTheme = {
    ...NavDefaultTheme,
    ...DefaultTheme,
    roundness: 12,
    colors: {
        ...NavDefaultTheme.colors,
        ...DefaultTheme.colors,
        primary: Color.Blue,
        accentedCard: NavDefaultTheme.colors.card,
        disabledItemText: Color.Grey,
        navAccent: Color.White,
        accent: Color.Blue,
    },
};

export const darkTheme: FullTheme = {
    ...NavDarkTheme,
    ...DarkTheme,
    roundness: 12,
    colors: {
        ...NavDarkTheme.colors,
        ...DarkTheme.colors,
        primary: Color.Blue,
        card: DarkTheme.colors.surface,
        accentedCard: Color.Grey,
        disabledItemText: Color.Grey,
        navAccent: Color.Blue,
        accent: Color.Blue,
    },
};
