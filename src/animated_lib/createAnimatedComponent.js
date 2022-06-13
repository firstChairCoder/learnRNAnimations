import React from "react";
import { Animated, StyleSheet, View, Button } from "react-native";

//warning: for components without `setnativeprops, React Native calls forceUpdate() that forces
// the whole component subtree to rerence. This is suboptimal
const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function App() {
  const animation = new Animated.Value(0);

  //...and setNativeProps is called using the ref which allows setNativeProps to be called
  // on the underlying native component
  setNativeProps = (props) => {
    button.setNativeProps(props);
  };

  // simple timing animation to change btn color.
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const animatedColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
  });

  return (
    <View style={styles.container}>
      <AnimatedButton
        // ref={(ref) => {
        //   button = ref;
        // }}                        //In the case as mentioned above, a ref is created on the Animated component
        title="Press Me"
        onPress={startAnimation}
        color={animatedColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
