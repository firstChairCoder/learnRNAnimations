import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

const Loop = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      {
        //the config object allows us to set the no. of times animation should repeat.
        // iterations: 5
      }
    ).start();
  };

  //to provide smooth animation, the animation should complete at the starting point, like this one.
  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyles = {
    transform: [
      {
        rotate: rotateInterpolate,
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "plum",
  },
});

export default Loop;