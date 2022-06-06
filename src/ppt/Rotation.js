import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";

const Rotation = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
    });
  };

  //radians / degrees are the two acceptable rotation values
  const xInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
    // outputRange: ["0rad", "6.28319rad"],
  });

  const yInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "0deg", "180deg"],
  });

  const animatedStyles = {
    // the rotate object also exists under the transform property
    transform: [
      //rotateX and rotateY flip the corresponding views on their Y- and X- axes respectively.
        {
        // rotate: xInterpolate,
        rotateX: xInterpolate,
      },
      //difference objects handle different rotation props though they are controlled by the
      //same value
      {
        rotateY: yInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
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

export default Rotation;
