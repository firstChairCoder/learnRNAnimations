import React from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const Multiply = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      // toValue becomes 50 * 6 = 300
      toValue: 50,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const randomValue = 6;
  // const randomValue = new Animated.Value(6)

  const newAnimation = Animated.multiply(animation, randomValue);

  const animatedStyle = {
    transform: [
      {
        translateY: newAnimation,
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </TouchableWithoutFeedback>

      <StatusBar style="auto" />
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

export default Multiply;
