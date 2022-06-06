//For more info, visit https://easings.net and https://facebook.github.io/react-native/docs/easing.html
import React from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

const Easing = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    //various easings exist as they conform to your particular use case.
    //here we have back, bounce, elastic and bezier
    Animated.timing(animation, {
      toValue: 300,
      duration: 500,
      // easing: Easing.back(5),
      // easing: Easing.bounce,
      // easing: Easing.elastic(3),
      easing: Easing.bezier(0.86, 1, 0.86, 0.23),
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    transform: [
      {
        translateY: animation,
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

export default Easing;
