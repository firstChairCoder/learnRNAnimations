import React from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const Interpolates = () => {
  const animation = new Animated.Value(0);

  // simple sequenced animation
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  //below are three interpolate functions. Note the following:
  //1. inputRange will always be ascending; outputRange not necessarily
  const animatedInterpolate = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 300, 0],
  });

  //2. you can interpolate on an interpolated value. This is used for opacity that should
  //reduce over time. Since we can't use descending values in the input range, this helps to
  //flip the logic, placing the original interpolate's outputRange as the current inputRange,
  //and outputting our desired descending opacity value.
  const interpolatedInterpolate = animatedInterpolate.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5],
  });

  //3. this works on the original interpolate variable as well. Interpolate is able to figure
  //out wild changes by mapping the data points through.
  const translateXinterpolate = animatedInterpolate.interpolate({
    inputRange: [0, 30, 50, 80, 100, 150, 290, 300],
    outputRange: [0, -30, -50, 80, -100, 300, 0, -100],
  });

  // in turn, the animation will affect motion horizontally and vertically, as well as opacity.
  const animatedStyles = {
    transform: [
      {
        translateY: animatedInterpolate,
      },
      {
        translateX: translateXinterpolate,
      },
    ],
    opacity: interpolatedInterpolate,
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
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "plum",
  },
});

export default Interpolates;
