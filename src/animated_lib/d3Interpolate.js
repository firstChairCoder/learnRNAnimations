import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { interpolateNumber, interpolateRgb } from "d3-interpolate";

const d3Interpolate = () => {
  const animation = new Animated.Value(0);
  //view ref to attach setNativeProps' animations to plain View
  const _view = useRef();

  useEffect(() => {
    // interpolateNumber and interpolateRgb are helpter functions that are simpler
    // expressions of our normal interpolate functions.
    const positionInterpolate = interpolateNumber(0, 200);
    const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");
    // listener is added to make style changes as the animated value changes
    animation.addListener(({ value }) => {
      const position = positionInterpolate(value);
      const color = colorInterpolate(value);

      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [
            {
              translateY: position,
            },
          ],
        },
      ];
      _view.current.setNativeProps({ style });
    });
  }, []);

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // animated styles function for translation using Animated.
  //   const animatedStyles = {
  //     backgroundColor: animation.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
  //     }),
  //     transform: [
  //       {
  //         translateY: animation.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [0, 200],
  //         }),
  //       },
  //     ],
  //   };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.box]} ref={_view} />
      </TouchableWithoutFeedback>
    </View>

    // Similar translation animation on Animated
    /* <View style={styles.container}>
<TouchableWithoutFeedback onPress={handlePress}>
    <Animated.View style={[styles.box, animatedStyle]} />
  </TouchableWithoutFeedback>
</View> */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "lime", // gets overwritten on Animated, but is used before onPress() is run with d3Interpolate
  },
});

export default d3Interpolate;
