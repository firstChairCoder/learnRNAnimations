import { StatusBar } from "expo-status-bar";
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
import { interpolateNumber, interpolateRgb } from "d3-interpolate";
import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path"; // doesn't handle complex svg paths
// import  from "@react-native-art"

//arrow
const startPath = `M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z`;
//checkmark
const endPath = `M27.704,8.397c-0.394-0.391-1.034-0.391-1.428,0  L11.988,22.59l-6.282-6.193c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l6.999,6.899  c0.39,0.386,1.039,0.386,1.429,0L27.704,9.811C28.099,9.421,28.099,8.787,27.704,8.397C27.31,8.006,28.099,8.787,27.704,8.397z`;

export default function App() {
  const animation = new Animated.Value(0);
  const _path = useRef();

  useEffect(() => {
    const pathInterpolate = interpolatePath(startPath, endPath);
    animation.addListener(({ value }) => {
      const path = pathInterpolate(value);

      _path.current.setNativeProps({
        d: path,
      });
    });
  }, []);

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

  const animatedStyles = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
    }),
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Svg width={150} height={150} fill="black">
          <Path d={startPath} stroke="black" ref={_path} />
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
