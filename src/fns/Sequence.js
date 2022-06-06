import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

const Sequence = () => {
  const colorAnimation = new Animated.Value(0);
  const scaleAnimation = new Animated.Value(1);

  // press function - Animated.sequence is basically the same as putting each consecutive
  // animation in the start callback function, but obviously without all the nesting.
  // everything else is as before/
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(colorAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 2,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const backgroundColorInterpolate = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
  });

  const boxStyle = {
    backgroundColor: backgroundColorInterpolate,
    transform: [
      {
        scale: scaleAnimation,
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.box, boxStyle]}>
          <Text style={styles.text}>Hello Parallel</Text>
        </Animated.View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});

export default Sequence;
