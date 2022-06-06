import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

const Divide = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  //again, this works with a normal integer or an animated.value
  const randomValue = 2;
  // const randomValue = new Animated.Value(2)

  const newAnimation = Animated.divide(animation, randomValue);

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

export default Divide;
