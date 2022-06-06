import React from "react";
import {Animated, View, TouchableWithoutFeedback, StyleSheet} from "react-native"

const Translate = () => {
    //animated.value starts from 0 to remove any offset from preset stylesheet values
  const animation = new Animated.Value(0);

  //onPress function
  const startAnimation = () => {
    Animated.timing(animation, {
      /*toValue for translate (transform API) moves to bottom(translateY) or right(translateX) *for positive values and moves to top or left respectively for negative values.
      */
        toValue: 300,
      // toValue: -300,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      //.setValue is a more straightforward way of "resetting" the animated value on animation
      //completion.
        animation.setValue(0);
    });
  };

  const animatedStyles = {
    //translateX and translateY fall under the transform prop which takes an array of ppts.
    transform: [
      {
        translateY: animation,
        // translateX: animation
      },
    ],
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

export default Translate;
