import React, { useRef } from "react";
import { Animated, StyleSheet, PanResponder, View } from "react-native";

const Decay = () => {
  // ref is edited in here for performance gains
  // use of animated.valuexy combines two values on this one variable call.
  const animation = useRef(new Animated.ValueXY(0)).current;

  // let _x = 0;
  // let _y = 0;

  // animation.addListener((value) => {
  //   _x = value.x;
  //   _y = value.y;
  // });

  let _panResponder = useRef(
    // 5 panResponder props used here
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   animation.setOffset({
      //     x: _x,
      //     y: _y,
      //   });
      //   animation.setValue({
      //     x: 0,
      //     y: 0,
      //   });
      // },
      //all commented lines from no. 9 -30 are replaced using extractOffset method for simplicity.
      onPanResponderGrant: (e, gestureState) => {
        animation.extractOffset();
      },
      // .event "separates" the valuesxy into their respective deltas.
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animation.x,
            dy: animation.y,
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
      // .decay takes the velocity on x and y axes as well as a deceleration value
      onPanResponderRelease: (e, { vx, vy }) => {
        Animated.decay(animation, {
          velocity: { x: vx, y: vy },
          deceleration: 0.997, // redundant placement as this is the default value.
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const animatedStyle = {
      /* the below is equivalent to:
       * [
           {
       *    translateX: animation.x   
       *   },
       *    {
       *     translateY: animation.y
       *    }
       * ]
       */
    transform: animation.getTranslateTransform(),
  };

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[styles.box, animatedStyle]}
        // spreads the "animation" using .panHandlers
        {..._panResponder.panHandlers}
      />
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
    height: 50,
    width: 50,
    backgroundColor: "plum",
  },
});

export default Decay;
