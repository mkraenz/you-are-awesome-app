import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, Easing, View } from "react-native";
import { Button } from "react-native-paper";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const initialIconSize = 0;

/** Snippet to easily test animations */
export default class AnimationTest extends React.Component<
    {},
    { isAnimating: boolean; iconSize: any }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAnimating: false,
            iconSize: new Animated.Value(initialIconSize),
        };
    }

    startAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.iconSize, {
                useNativeDriver: false,
                toValue: 120,
                duration: 400,
                easing: Easing.back(0.8),
            }),
            Animated.delay(300),
            Animated.timing(this.state.iconSize, {
                useNativeDriver: false,
                toValue: 0,
                duration: 250,
                easing: Easing.back(0.8),
            }),
        ]).start(() => this.setState({ isAnimating: false }));
    };

    render() {
        const play = () => {
            if (!this.state.isAnimating) {
                this.startAnimation();
                this.setState({ isAnimating: true });
            }
        };
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                <View
                    style={{ position: "relative", justifyContent: "center" }}
                >
                    <AnimatedIcon
                        name="favorite"
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                            fontSize: this.state.iconSize,
                        }}
                        color="#ff1084"
                    />
                </View>
                <View>
                    <Button
                        onPress={play}
                        accessibilityStates={{}}
                        mode="contained"
                    >
                        Play
                    </Button>
                    <Button
                        onPress={() =>
                            this.setState({
                                iconSize: new Animated.Value(initialIconSize),
                            })
                        }
                        accessibilityStates={{}}
                        mode="contained"
                    >
                        Revert
                    </Button>
                </View>
            </View>
        );
    }
}
