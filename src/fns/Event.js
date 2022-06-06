import React from "react";
import { ScrollView, Animated, View, StyleSheet } from "react-native";

const Event = () => {
  const animation = new Animated.Value(0);

  //main animation changes bg color onScroll
  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
  });

  const bgStyle = {
    backgroundColor: backgroundInterpolate,
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        scrollEventThrottle={16}
        //the "robust way of handling animation change"
        // onScroll={(e) => {animation.setValue(e.nativeEvent.contentOffset.y)} }

        //use of animated.event
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
          // { listener: (event) => console.log(event), // Optional async listener
          { useNativeDriver: false } // required config object
        )}
      >
        <Animated.View style={[styles.content, bgStyle]} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 3000,
  },
});

export default Event;
