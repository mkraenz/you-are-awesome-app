import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ContributionScreen from "./pages/ContributionScreen";
import HomePage from "./pages/HomePage";

// injects `props.navigation` into components
const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
        },
        AddAwesomeTextModal: {
            screen: ContributionScreen,
        },
    },
    {
        initialRouteName: "AddAwesomeTextModal",
        mode: "modal",
        headerMode: "none",
    }
);

const NavigationAppContainer = createAppContainer(RootStack);
export default NavigationAppContainer;
