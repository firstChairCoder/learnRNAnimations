import React from "react";

const Extrapolate = () => {
  const animation = new Animated.Value(1);

  const startAnimation = () => {
    Animated.timing(animation, {
      // toValue: 2,
      toValue: 3,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        // toValue: 1,
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  //extrapolate has a default of extend, so for toValue of 3, it knows to extend past the given ouput range
  // when set to clamp, it respects the boundary of the outputRange and stays at 2
  // when set to identity, the inputRange is ignored and the animated value is used instead
  // extrapolateleft / extrapolateright are seldom right as they are usually the same
  const scaleInterpolate = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 2],
    // outputRange: [1, 1.1],
    // extrapolate: "clamp",
    // extrapolate: "identity"
    // extrapolateRight: "clamp"
    extrapolateLeft: "clamp",
  });

  const animatedStyles = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "plum",
  },
});

export default Extrapolate;
