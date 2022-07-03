/* This will deal with managing interrupted
   animations that cannot be simply managed with state */
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

export default function App() {
  const animation = new Animated.Value(1);
  const [visible, setVisible] = useState(true); // this checks on animation mount / unmount

  const handlePress = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500, // duration is long enough to allow for interruptions onPress
      useNativeDriver: false,
    }).start(({ finished }) => {
      // console.log(finished)
      /* Animated callback passed into start has a tag called finished 
         that resolves to a boolean value based on whether animation 
         interruption
      */
      setTimeout(() => {
        if (finished) {
          setVisible(false); //state change shows no interruption
        } else {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        }
      }, 0);
      /* the above setTimeout is not ideal as we are triggering another
         animation on the same value. Ideally, we should use 2 difference
         functions to achieve this: one to reset and one for the normal onPress
         A state value can then toggle between both. See below for the
         implementation in a commented block
      */
    });
  };

  // const startAnimation = () => {
  //   setStarted(true);
  //   return Animated.timing(animation, {
  //     toValue: 0,
  //     duration: 1500,
  //     useNativeDriver: false,
  //   }).start(({ finished }) => {
  //     setVisible(!finished), setStarted(false);
  //   });
  // };

  // const resetAnimatioon = () => {
  //   setStarted(false)
  //   return Animated.spring(animation, {
  //     toValue: 1,
  //     useNativeDriver: false
  //   }).start()
  // }

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const animatedStyles = {
    opacity: animation, // box fades as it moves off the screen
    transform: [
      {
        translateY: translateYInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {visible && (
        // <TouchableWithoutFeedback onPress={started ? resetAnimation : startAnimation}>   // toggle between functions
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      )}
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
    width: 150,
    height: 150,
    backgroundColor: "lime",
  },
});
