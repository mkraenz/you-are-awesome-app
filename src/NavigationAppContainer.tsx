import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ContributionPage from "./pages/ContributionPage";
import HomePage from "./pages/HomePage";

// injects `props.navigation` into components
const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
        },
        Contribute: {
            screen: ContributionPage,
        },
    },
    {
        initialRouteName: "Home",
        mode: "modal",
        headerMode: "none",
    }
);

const NavigationAppContainer = createAppContainer(RootStack);
export default NavigationAppContainer;
