import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  } from "react-native";

const { width, height } = Dimensions.get("window"); // get phone window/screen dimensions

export default function App() {
  const animation = new Animated.ValueXY();
  const [layout, setLayout] = useState({ _width: 0, _height: 0 });

  // In my saveDimensions function, I use state to hold the onLayout values
  const saveDimensions = (e) => {
    const { height, width } = e.nativeEvent.layout;
    const newLayout = {
      _width: width,
      _height: height,
    };
    setLayout(newLayout); 
  };

  const handlePress = () => {
    //sequence of 4 spring animations
    Animated.sequence([
      Animated.spring(animation.y, {
        toValue: height - layout._height,
        useNativeDriver: false,
      }),  //moves down
      Animated.spring(animation.x, {
        toValue: width - layout._width,
        useNativeDriver: false,
      }), //moves right
      Animated.spring(animation.y, {
        toValue: 0,
        useNativeDriver: false,
      }), // moves up
      Animated.spring(animation.x, {
        toValue: 0,
        useNativeDriver: false,
      }), // moves left (back to initial point)
    ]).start();
  };

  //Note: Due to use of onLayout value on the toValue, the box may not go down to the bottom of the screen exactly on some screens.
  
  const animatedStyles = {
    transform: animation.getTranslateTransform(),
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress} onLayout={saveDimensions}>
        <Animated.View style={[styles.box, animatedStyles]} />
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
  box: {
    width: 150, //this value is redundant with onLayout
    height: 150, //this value is redundant with onLayout
    backgroundColor: "lime",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
