import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const Stagger = () => {
  const colorAnimation = new Animated.Value(0);
  const scaleAnimation = new Animated.Value(1);

  const handlePress = () => {
    // this simply means delay the initial animation while running the others in a sequence.
    // for this example, both animations will end at 500ms.
    // greater use is to be shown later.
    Animated.stagger(200, [
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

export default Stagger;
