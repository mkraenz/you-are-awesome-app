import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ComponentClass, FC, FunctionComponent } from "react";

interface Props {
    component: ComponentClass<any, any> | FunctionComponent<any>;
    name?: string;
}

const Stack = createStackNavigator();
const MockedNavigator: FC<Props> = ({ component, name = "MockedScreen" }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={name} component={component} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MockedNavigator;
