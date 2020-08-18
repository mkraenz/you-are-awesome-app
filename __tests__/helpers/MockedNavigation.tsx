import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ComponentClass, FC, FunctionComponent } from "react";

interface Props {
    component: ComponentClass<any, any> | FunctionComponent<any>;
}

const Stack = createStackNavigator();
const MockedNavigator: FC<Props> = ({ component }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MockedScreen" component={component} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MockedNavigator;
