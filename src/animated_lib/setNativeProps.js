// import { StatusBar } from "expo-status-bar";
// import { createRef, useEffect, useRef, useState } from "react";
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
//   Button,
// } from "react-native";

// //warning: onsetnativeprops and forceUpdate() call that forces the whole component
// //subtree. This is suboptimal
// const AnimatedButton = Animated.createAnimatedComponent(Button);

// export default function App() {
//   const animation = new Animated.Value(0);
//   const [enabled, setEnabled] = useState(true)
//   const _scroll = useRef()

//   useEffect(() => {
//     console.log(enabled)
//   }, [enabled])

//   const handleToggle = () => {
//     setEnabled(!enabled)
//     let style = [styles.scroll];

//     // if (enabled) {
//     //   style.push(styles.show);
//     // } else {
//     //   style.push(styles.hide);
//     // }

//     _scroll.current.setNativeProps({
//       scrollEnabled: enabled,
//       // style,
//     });
//   };

//   const bgInterpolate = animation.interpolate({
//     inputRange: [0, 3000],
//     outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
//   });

//   const scrollStyle = {
//     backgroundColor: bgInterpolate,
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleToggle}>
//         <Text>Toggle</Text>
//       </TouchableOpacity>

//       <ScrollView
//         style={styles.scroll}
//         ref={_scroll}
//         scrollEventThrottle={16}
//         onScroll={Animated.event([
//           {
//             nativeEvent: {
//               contentOffset: {
//                 y: animation,
//               },
//             },
//           },
//         ], 
//           { useNativeDriver: false }
//         )}
//       >
//         <Animated.View style={[styles.fakeContent, scrollStyle]} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//   },
//   scroll: {
//     flex: 1,
//     opacity: 1,
//   },
//   hide: {
//     opacity: 0,
//   },
//   show: {
//     opacity: 1,
//   },
//   fakeContent: {
//     height: 3000,
//     backgroundColor: "lime" //irrelevant, replaced by bgInterpolate value
//   }
// });
