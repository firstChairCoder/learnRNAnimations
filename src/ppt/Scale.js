import React from "react";
import { View, Text, Animated, TouchableWithoutFeedback } from "react-native";

const Scale = () => {
  //for scale animation, an animated value of 0 would be non-existent
  const animation = new Animated.Value(1);

  //animated.timing onPress function
  const startAnimation = () => {
    Animated.timing(animation, {
      //for scale, a negative toValue flips the according view on its axis
      toValue: -2,
      //toValue: 2,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    transform: [
      {
        // like opacity, scale is also an object under transform.
        // it can take X and Y values as well for non-linear scaling.
        // it does this by transforming from the center of the element.
        scale: animation,
        // scaleX: animation,
        // scaleY: animation,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <Text>This side forward</Text>
        </Animated.View>
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

export default Scale;
