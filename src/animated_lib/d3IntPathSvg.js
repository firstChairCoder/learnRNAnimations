import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  } from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path"; // doesn't handle complex svg paths

//small circle
const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
//big circle
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;

const d3IntpathSvg = () => {
  const animation = new Animated.Value(0);
  const _path = useRef();

  //Animated doesn't support path interpolation at this time.
  //There are other, better updated libs for heavy svg interpolations
  useEffect(() => {
    const pathInterpolate = interpolatePath(startPath, endPath);
    animation.addListener(({ value }) => {
      const path = pathInterpolate(value);

      //similar to previous
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
      // special use of delay on its own. can also be integrated into first timing animation
      Animated.delay(1500),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
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

export default d3IntpathSvg