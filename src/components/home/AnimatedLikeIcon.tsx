import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, Easing, TextStyle } from "react-native";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);
type AnimatedIcon = typeof AnimatedIcon;

const initialIconSize = 0;

interface Props {
    onFinished: () => void;
    onStart: () => void;
    style?:
        | Animated.Value
        | Animated.AnimatedInterpolation
        | Animated.WithAnimatedObject<TextStyle>;
    maxIconSize: number;
}

export default class AnimatedLikeIcon extends React.Component<
    Props,
    { isAnimating: boolean; iconSize: Animated.Value }
> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAnimating: false,
            iconSize: new Animated.Value(initialIconSize),
        };
    }

    componentDidMount() {
        if (!this.state.isAnimating) {
            this.startAnimation();
            this.setState({ isAnimating: true });
        }
    }

    private startAnimation() {
        const onFinish = () => {
            this.setState({ isAnimating: false });
            this.props.onFinished();
        };

        this.props.onStart();
        const anim = Animated.sequence([
            Animated.timing(this.state.iconSize, {
                useNativeDriver: false,
                toValue: this.props.maxIconSize,
                duration: 400,
                easing: Easing.back(0.8),
            }),
            Animated.delay(300),
            Animated.timing(this.state.iconSize, {
                useNativeDriver: false,
                toValue: initialIconSize,
                duration: 250,
                easing: Easing.back(0.8),
            }),
        ]);
        anim.start(onFinish);
    }

    render() {
        return (
            <AnimatedIcon
                name="favorite"
                style={{
                    ...(this.props.style || {}),
                    fontSize: this.state.iconSize,
                }}
                color="#ff1084"
            />
        );
    }
}
