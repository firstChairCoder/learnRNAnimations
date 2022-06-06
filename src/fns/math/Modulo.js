import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from "react-native";

const Modulo = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
      //see Parallel.js for more info
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 12,
        duration: 3500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const randomValue = 3;
  // const randomValue = new Animated.Value(3)

  //value results to 0 at beginning. It continues to calculate the modulo as the animation
  //between the ranges progresses.
  const newAnimation = Animated.modulo(animation, randomValue);
  const interpolated = newAnimation.interpolate({
    inputRange: [0, 3],
    outputRange: ["0deg", "270deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolated,
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "plum",
  },
});

export default Modulo;
