import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from "react-navigation";

export interface INavigationProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
