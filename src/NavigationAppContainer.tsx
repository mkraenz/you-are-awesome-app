import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { START_SCREEN } from "./config";
import { Navigation } from "./Navigation";
import ContributionPage from "./pages/ContributionPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

// injects `props.navigation` into components
const RootStack = createStackNavigator(
    {
        [Navigation.Home]: { screen: HomePage },
        [Navigation.Contribute]: { screen: ContributionPage },
        [Navigation.Settings]: { screen: SettingsPage },
    },
    {
        initialRouteName: START_SCREEN,
        headerMode: "none",
    }
);

const NavigationAppContainer = createAppContainer(RootStack);
export default NavigationAppContainer;
