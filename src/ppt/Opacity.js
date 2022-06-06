import React from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const Opacity = () => {
    // animated vakue defined with an initial "state" of 1
    const animation = new Animated.Value(1);

    //function run when box is pressed
  const startAnimation = () => {
      //timing animation that changes animated value to 0 in 350ms
    Animated.timing(animation, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start(() => {
        //callback fn that returns the animated value back to 1 after 1st .timing is complete.
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  //animate function passed to animated.view that makes opacity dependent on animated.value
  const animatedStyles = {
    opacity: animation,
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

export default Opacity;
