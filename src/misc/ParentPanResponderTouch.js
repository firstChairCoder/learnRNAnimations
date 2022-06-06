import React from "react"

const { height, width } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

const ParentPanResponderTouch = () => {
  // const animation = new Animated.Value(0);
  const [zone, setZone] = useState("Still Touchable");

  const onPress = () => {
    setZone("I got touched with a parent pan responder");
  };

  let _panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) =>
        !!getDirectionAndColor(gestureState),
      onPanResponderMove: (e, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        setZone(drag);
      },
      onPanResponderTerminationRequest: (e, gestureState) => true,
    })
  ).current;

  return (
    <View style={[styles.container]} {..._panResponder.panHandlers}>
      <View style={styles.zone1} />
      <View style={styles.center}>
        <TouchableOpacity onPress={onPress}>
          <Text>{zone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.zone2} />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red",
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
});

export default ParentPanResponderTouch