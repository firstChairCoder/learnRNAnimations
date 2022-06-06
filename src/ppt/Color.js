import React from "react"
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";

const Color = () => {
    const animation = new Animated.Value(0);
  
    const startAnimation = () => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: false,
      }).start(() => {
        animation.setValue(0);
      });
    };
    
    //the animation uses the mapping of input and output range values and figures things
    // out for itself in undefined territories.
    const colorInterpolate = animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["rgb(71,255,99)", "rgb(255,99,71)", "rgb(99,71,255)"],
    });
  
    const bgStyle = {
      backgroundColor: animation.interpolate({
        inputRange: [0, 2],
        //only alpha value changes in this animation
        outputRange: ["rgb(255,99,71)", "rgba(255,99,71,0)"],
      }),
    };
  
    const animatedStyles = {
      backgroundColor: colorInterpolate,
    };
  
    return (
      <Animated.View style={[styles.container, bgStyle]}>
        <TouchableWithoutFeedback onPress={startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </Animated.View>
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
    },
  });

  export default Color