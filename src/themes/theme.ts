import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from "@react-navigation/native";
import { DarkTheme, DefaultTheme, Theme } from "react-native-paper";

type NavigationTheme = typeof NavDarkTheme | typeof NavDefaultTheme;

export type FullTheme = Theme &
    NavigationTheme & {
        colors: { accentedCard: string; disabledItemText: string };
    };

export enum Color {
    LightBlue = "#89cff0",
    Blue = "#1084ff",
    Violet = "#4e148c",
    DarkTurquoise = "#00DAC6",
    DarkGrey = "#202c39",
    Grey = "#272727",
}

export const lightTheme: FullTheme = {
    ...NavDefaultTheme,
    ...DefaultTheme,
    roundness: 12,
    colors: {
        ...NavDefaultTheme.colors,
        ...DefaultTheme.colors,
        primary: Color.Blue,
        accent: "white", // TODO maybe split nav theme and paper theme. With the current approach, enabled switches are white on white background etc.
        accentedCard: NavDefaultTheme.colors.card,
        disabledItemText: Color.Grey,
    },
};

export const darkTheme: FullTheme = {
    ...NavDarkTheme,
    ...DarkTheme,
    roundness: 12,
    colors: {
        ...NavDarkTheme.colors,
        ...DarkTheme.colors,
        primary: Color.Violet,
        card: DarkTheme.colors.surface,
        accentedCard: Color.Grey,
        disabledItemText: Color.Grey,
    },
};
