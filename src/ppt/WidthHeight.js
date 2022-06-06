import React from "react";
import {View, Text, TouchableWithoutFeedback, Animated, StyleSheet
} from "react-native"

const WidthHeight = () => {
  const animation = new Animated.Value(150);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyles = {
    //a single animated.value as shown here can control two (or more) properties at the same time.
    width: animation,
    height: animation,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}>
            {/* placeholder text here shows how change in layout affects text placement in a view */}
          <Text>
            This quite long piece of text serves no purpose other than to
            demonstrate the effect the layout changes caused by animating with
            and height will have on it. Carry on.
          </Text>
        </Animated.View>
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
    //our animated value controls the width and height here rendering these values void
    // width: 150,
    // height: 150,
    backgroundColor: "plum",
  },
});

export default WidthHeight;
