import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Easing,
  ScrollView,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolate } from "flubber";

const { height } = Dimensions.get("window");
export default function App() {
  const animation = new Animated.ValueXY();

  let _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animation.extractOffset(); // preserves drag location by moving deltas to offset and comparing from that previous point
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animation.x,
            dy: animation.y,
          },
        ],
        { useNativeDriver: false }
      ),
    })
  ).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.delay(1500),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const verdad = height / 2
  console.log(height)
  // .99 cliff is you define a start value and the second value will be defined right before that second value takes effect. This makes animations happen instantly.
  const inputRange = [0, verdad - 50.01, verdad - 50, height];

  const bgInterpolate = animation.y.interpolate({
    inputRange,
    outputRange: [
      "rgb(99,71,255)",
      "rgb(99,71,255)",
      "rgb(255,0,0)",
      "rgb(255,0,0)",
    ],
  });

  const flipInterpolate = animation.y.interpolate({
    inputRange,
    outputRange: [1,1,-1,-1]
  })

  const animatedStyles = {
    backgroundColor: bgInterpolate,
    transform: [
      ...animation.getTranslateTransform(),
    {
      scale: flipInterpolate
    }
    ],
  };

  return (
    <View style={styles.container}>
      <View style={[styles.top, styles.center, styles.container]}>
        <Text>Good</Text>
      </View>
      <View style={[styles.center, styles.container]}>
        <Text>Bad</Text>
      </View>
      <Animated.View
        {..._panResponder.panHandlers}
        style={[styles.box, styles.center, animatedStyles]}
      >
        <Text>Box</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 0,
    left: 0,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});