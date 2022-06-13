// import { StatusBar } from "expo-status-bar";
// import { useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   StyleSheet,
//   Text,
//   View,
//   TouchableWithoutFeedback,
//   Easing,
//   ScrollView,
//   PanResponder,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import clamp from "clamp";

// import Cat1 from "./assets/images/cat1.jpeg";
// import Cat2 from "./assets/images/cat2.jpeg";
// import Cat3 from "./assets/images/cat3.jpeg";
// import Cat4 from "./assets/images/cat4.jpeg";

// const SWIPE_THRESHOLD = 120;
// const { height, width } = Dimensions.get("window");

// export default function App() {
//   const animation = new Animated.ValueXY();
//   const opacity = new Animated.Value(1);
//   const next = new Animated.Value(0.9);
//   // const prevItems = usePrevious(items);
//   const [items, setItems] = useState([
//     {
//       image: Cat1,
//       id: 1,
//       text: "Sweet Cat",
//     },
//     {
//       image: Cat2,
//       id: 2,
//       text: "Sweeter Cat",
//     },
//     {
//       image: Cat3,
//       id: 3,
//       text: "Sweetest Cat",
//     },
//     {
//       image: Cat4,
//       id: 4,
//       text: "Aww",
//     },
//   ]);
//   const latest = useRef(items);
//   const isFirstRender = useRef(true);

//   // function usePrevious(value) {
//   //   const ref = useRef();

//   //   useEffect(() => {
//   //     ref.current = value;
//   //   }, [value]);

//   //   return ref.current;
//   // }
//   useEffect(() => {
//     setInterval(() => {
//       console.log("Opacity is ", opacity);
//     }, 1500);
//   }, []);

//   console.log(items.length);

//   let _panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event(
//         [
//           null,
//           {
//             dx: animation.x,
//             dy: animation.y,
//           },
//         ],
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: (e, { dx, vx, vy }) => {
//         let velocity;

//         if (vx >= 0) {
//           velocity = clamp(vx, 3, 5);
//         } else if (vx < 0) {
//           velocity = clamp(Math.abs(vx), 3, 5) * -1;
//         }

//         if (Math.abs(dx) > SWIPE_THRESHOLD) {
//           Animated.decay(animation, {
//             velocity: { x: velocity, y: vy },
//             deceleration: 0.98,
//             useNativeDriver: false,
//           }).start(transitionNext);
//         } else {
//           Animated.spring(animation, {
//             toValue: { x: 0, y: 0 },
//             friction: 4,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   // useEffect(() => {
//   //   if (isFirstRender.current) {
//   //     isFirstRender.current = false;
//   //     return
//   //   }
//   //   if (items.length < 4) {
//   //       next.setValue(0.9);
//   //       opacity.setValue(1);
//   //       animation.setValue({ x: 0, y: 0 });
//   //   }
//   // }, [items.length]);

//   const transitionNext = () => {
//     Animated.parallel([
//       Animated.timing(opacity, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//       Animated.spring(next, {
//         toValue: 1,
//         friction: 4,
//         useNativeDriver: false,
//       }),
//     ]).start(() => {
//       setItems((items) => {
//         return items.slice(1);
//       });
//     });
//   };

//   useEffect(() => {
//     // () => {
//       if (items.length !== 4) {
//     //  return next.setValue(0.9);
//     opacity.setValue(1);
//     // return
//     // animation.setValue({ x: 0, y: 0 });
//     }
//     return
//   }, []);

//   const rotate = animation.x.interpolate({
//     inputRange: [-200, 0, 200],
//     outputRange: ["-30deg", "0deg", "-30deg"],
//     extrapolate: "clamp",
//   });

//   const opacityInterpolate = animation.x.interpolate({
//     inputRange: [-200, 0, 200],
//     outputRange: [0.5, 1, 0.5],
//     extrapolate: "clamp",
//   });

//   const animatedCardStyles = {
//     opacity,
//     transform: [
//       {
//         rotate,
//       },
//       ...animation.getTranslateTransform(),
//     ],
//   };

//   const animatedImageStyles = {
//     opacity: opacityInterpolate,
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.top}>
//         {items
//           .slice(0, 2)
//           .reverse()
//           .map(({ image, id, text }, index, items) => {
//             const isLastItem = index === items.length - 1;
//             const isSecondToLast = index === items.length - 2;

//             const panHandlers = isLastItem ? _panResponder.panHandlers : {};
//             const cardStyle = isLastItem ? animatedCardStyles : undefined;
//             const imageStyle = isLastItem ? animatedImageStyles : undefined;

//             const nextStyle = isSecondToLast
//               ? {
//                   transform: [
//                     {
//                       scale: next,
//                     },
//                   ],
//                 }
//               : undefined;

//             return (
//               <Animated.View
//                 key={id}
//                 style={[styles.card, cardStyle, nextStyle]}
//                 {...panHandlers}
//               >
//                 <Animated.Image
//                   style={[styles.image, imageStyle]}
//                   source={image}
//                   resizeMode="cover"
//                 />
//                 <View style={styles.lowerText}>
//                   <Text>{text}</Text>
//                 </View>
//               </Animated.View>
//             );
//           })}
//       </View>
//       <View style={styles.buttonBar}></View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   top: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonBar: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   card: {
//     width: 300,
//     height: 300,
//     position: "absolute",
//     borderRadius: 3,
//     shadowColor: "black",
//     shadowOpacity: 0.1,
//     shadowOffset: { x: 0, y: 0 },
//     shadowRadius: 5,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#FFF",
//   },
//   image: {
//     width: null,
//     height: null,
//     flex: 3,
//     borderRadius: 2,
//   },
//   lowerText: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     padding: 5,
//   },
// });