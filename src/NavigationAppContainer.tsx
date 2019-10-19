import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ContributionPage from "./pages/ContributionPage";
import RefreshableHomePage from "./pages/RefreshableHomePage";

// injects `props.navigation` into components
const RootStack = createStackNavigator(
    {
        Home: {
            screen: RefreshableHomePage,
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
