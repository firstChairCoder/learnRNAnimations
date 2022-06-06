import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Percentage = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  //interpolate using percentages as output range values
  const widthInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["20%", "50%"],
  });

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["20%", "30%"],
  });

  const animatedStyles = {
    width: widthInterpolate,
    height: heightInterpolate,
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
  //width and height values are handled by animated value
  box: {
    // width: 150,
    // height: 150,
    backgroundColor: "plum",
  },
});

export default Percentage;
