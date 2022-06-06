import React from "react"
import { StyleSheet, Animated, View, TouchableWithoutFeedback } from "react-native";

const Spring = () => {
    const animation = new Animated.Value(1);
  
    const handlePress = () => {
      // this listener shows that the spring animation causes the animation to shoot past
      // the animated value during the course of running the animation.
        animation.addListener(({ value }) => {
        console.log(value);
      });
      /* animated.spring has defaults of tension=40 and friction=7.
       * the higher the friction, the quicker the spring animation to slow down,
       * the higher the tension, the slower the spring animation to slow down.
       */
      Animated.spring(animation, {
        toValue: 2,
        friction: 2,
        tension: 160,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    };
    
    //scale is being animated here
    const animatedStyles = {
      transform: [
        {
          scale: animation,
        },
      ],
    };
  
    return (
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={handlePress}>
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
      width: 50,
      height: 50,
      backgroundColor: "plum",
    },
  });

  export default Spring