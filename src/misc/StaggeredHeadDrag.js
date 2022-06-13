import { useRef, useState } from "react";
import { Animated, StyleSheet, View, PanResponder } from "react-native";

// image of Animated creator used
const Vjeux = { uri: "http://i.imgur.com/eiNhZrh.jpg" };

const StaggeredHeadDrag = () => {
  //creation of 4 images in state, each with their animated value
  // the text in the first head is inconsequential in the animation here.
  const [heads, setHeads] = useState([
    {
      image: Vjeux,
      animation: new Animated.ValueXY(),
      text: "Drag Me",
    },
    {
      image: Vjeux,
      animation: new Animated.ValueXY(),
    },
    {
      image: Vjeux,
      animation: new Animated.ValueXY(),
    },
    {
      image: Vjeux,
      animation: new Animated.ValueXY(),
    },
  ]);

  //
  let _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // we call our extractOffset() method here
      onPanResponderGrant: () => {
        heads.map(({ animation }) => {
          animation.extractOffset();
          // animation.setValue({ x: 0, y: 0})  // this setValue bug has since been fixed in Animated
        });
      },
      onPanResponderMove: (_, { dx, dy }) => {
        // this controls the animation for the first head only
        heads[0].animation.setValue({
          x: dx,
          y: dy,
        });

        /*default stagger shown here will only work on first head because onPanResponderMove
         * is called on every drag.
         * that means this 10ms delay basically "resets" and leaves them hanging till the
         * finger is lifted from the screen(no more drags).
         */
        // const animations = heads.slice(1).map(({ animation }) => {
        //   return Animated.spring(animation, {
        //     toValue: { x: dx, y: dy },
        //     useNativeDriver: false
        //   });
        // });

        // Animated.stagger(10, animations).start();

        // this custom stagger animation allows the delay per item which enables the spring
        // animation effect each head, causing the right stagger animation as required.
        const animations = heads.slice(1).map(({ animation }, index) => {
          Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: { x: dx, y: dy },
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* here, we create a shallow copy of the `heads` state and reverse it so that the initial 
      index is shown on top. As mentioned in the video, a simpler way would be to apply a high 
      zIndex to head at index 0. */}
      {heads
        .slice(0)
        .reverse()
        .map((item, index, items) => {
          // pan spreads from only the final item which allows our drag animation to spread
          // through to all other heads
          const pan =
            index === items.length - 1 ? _panResponder.panHandlers : {};
          return (
            <Animated.Image
              {...pan}
              key={index}
              source={item.image}
              style={[
                styles.head,
                {
                  // resolves our x and y animatiion values for each respective head
                  transform: item.animation.getTranslateTransform(),
                },
              ]}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StaggeredHeadDrag;
