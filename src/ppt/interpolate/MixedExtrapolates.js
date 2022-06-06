import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  View,
  Text,
  StyleSheet,
  PanResponder,
} from "react-native";

const { height } = Dimensions.get("window");

const MixedExtrapolates = () => {
  const animation = useRef(new Animated.ValueXY(0)).current;
  const [value, setValue] = useState(0);

  useEffect(() => {
    // use a listener to log the change in values. Remember this is just for show, and not
    // practical in a real world app, as the updates are a lot and could slow down the app.
    animation.y.addListener(({ value }) => {
      console.log("~ animation.addListener ~ value", value);
      setValue(value);
    });
  }, [value]);

  let _panResponder = useRef(
    // similar was covered in Decay.js
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        animation.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: animation.x, dy: animation.y }],
        {
          useNativeDriver: false,
        }
      ),
    })
  ).current;

  //the mixed extrapolates means the number at the bottom will be fixed while that on top will
  // "extend" far greater. In practice, the interpolation occurs only on the `y` of the drag gesture.
  const scaleAndFlipOnReverse = animation.y.interpolate({
    inputRange: [0, height / 3],
    outputRange: [0.1, 1],
    extrapolateLeft: "extend",
    extrapolateRight: "clamp",
  });

  //placing the interpolate function on scale allows it to "flip"
  const animatedStyle = {
    transform: [
      {
        scale: scaleAndFlipOnReverse,
      },
    ],
  };

  return (
    // gestures are applied to container view, which is why the box starts off that small, and also
    // allows us to interact with the whole screen
    <View style={[styles.container]} {..._panResponder.panHandlers}>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text>
          {Math.round(value)}/{Math.round(height / 3)}
        </Text>
      </Animated.View>
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
    height: 75,
    width: 75,
    backgroundColor: "plum",
  },
});

export default MixedExtrapolates;
