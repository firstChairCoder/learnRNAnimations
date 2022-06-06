import React from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
const Absolute = () => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    //here, our animated.value is handling 3 absolute props at the same time
    top: animation,
    left: animation,
    right: animation,
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
  //disabling width makes the view span the width of the screen
  box: {
    position: "absolute",
    // left: 0,
    // top: 0,
    right: 0,
    // width: 150,
    height: 150,
    backgroundColor: "plum",
  },
});

export default Absolute;
