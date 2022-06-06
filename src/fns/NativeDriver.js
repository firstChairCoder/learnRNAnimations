import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const NativeDriver = () => {
  const animation = new Animated.Value(0);

  //1st example: the useNativeDriver: true prop for both timing and spring animation allow
  //smooth animation running on the native side in case of other JS functions "clogging" the
  //main JS thread, like the setTimeout function here
  const startAnimation = () => {
    // Animated.timing(animation, {
      Animated.spring(animation, {
      toValue: 300,
      duration: 1500,
    //   useNativeDriver: false,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(0);
    });

    setTimeout(() => {
      let i = 0;
      while (i <= 500000000) {
        i++;
      }
    }, 500);
  };

  //2nd example: shows useNativeDriver: true usage with Animated.event function in a scrollview.
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: [1, 0],
  });

  const bgStyle = {
    backgroundColor: "plum",
    opacity: opacityInterpolate,
  };

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        <Animated.View style={[styles.content, bgStyle]} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  //only flex prop is needed in the second example
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "plum",
  },
  content: {
    height: 3000,
  },
});

export default NativeDriver;
