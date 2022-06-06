import React from "react";
import {Animated, View, TouchableWithoutFeedback, StyleSheet} from "react-native";

const Add = () => {
  const animation = new Animated.Value(0);

  //sample translate animation
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

  // the added(offset) value can be a plain integer or an animated.value.
  // const randomValue = 50;
  const randomValue = new Animated.Value(50);

  //.add function
  const newAnimation = Animated.add(animation, randomValue);

  const animatedStyle = {
    // newAnimation in this case, shifts the view down by 50dp as the new starting point.
    transform: [
      {
        // translateY: animation,
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

export default Add;
