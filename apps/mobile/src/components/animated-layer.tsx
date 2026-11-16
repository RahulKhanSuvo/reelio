import { useEffect, type ReactNode } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { Animation } from "@reelio/template-schema";
import type { StyleProp, ViewStyle } from "react-native";

function easingFor(name: string) {
  switch (name) {
    case "linear":
      return Easing.linear;
    case "ease-in":
      return Easing.in(Easing.quad);
    case "ease-in-out":
      return Easing.inOut(Easing.quad);
    default:
      return Easing.out(Easing.quad);
  }
}

/**
 * Wraps a template layer and applies its `animation` from the schema:
 * an entrance transition (`in`) and/or an infinite loop (`loop`).
 * A single animated style merges both so properties never fight.
 */
export function AnimatedLayer({
  animation,
  scale = 1,
  style,
  children,
}: {
  animation?: Animation;
  /** canvas→screen scale, used to size motion to the layer */
  scale?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const entering = animation?.in;
  const loop = animation?.loop;

  // 0 → 1 entrance progress; 0 → 1 repeating loop phase
  const progress = useSharedValue(entering ? 0 : 1);
  const phase = useSharedValue(0);

  useEffect(() => {
    if (!entering) return;
    progress.value = 0;
    progress.value = withDelay(
      entering.delayMs,
      entering.easing === "spring"
        ? withSpring(1, { damping: 15, stiffness: 170 })
        : withTiming(1, { duration: entering.durationMs, easing: easingFor(entering.easing) })
    );
  }, [entering, progress]);

  useEffect(() => {
    if (!loop) return;
    phase.value = 0;
    phase.value = withRepeat(
      withTiming(1, { duration: loop.periodMs, easing: Easing.linear }),
      -1,
      false
    );
  }, [loop, phase]);

  const animated = useAnimatedStyle(() => {
    const p = progress.value;
    const t = phase.value;
    let opacity = 1;
    let scaleValue = 1;
    let translateX = 0;
    let translateY = 0;
    let rotate = 0;

    if (entering) {
      const ease = Math.min(p, 1);
      switch (entering.type) {
        case "fade":
          opacity = ease;
          break;
        case "slide-up":
          opacity = ease;
          translateY = (1 - ease) * 48 * scale;
          break;
        case "slide-down":
          opacity = ease;
          translateY = -(1 - ease) * 48 * scale;
          break;
        case "slide-left":
          opacity = ease;
          translateX = (1 - ease) * 64 * scale;
          break;
        case "slide-right":
          opacity = ease;
          translateX = -(1 - ease) * 64 * scale;
          break;
        case "zoom-in":
          opacity = ease;
          scaleValue = 0.7 + 0.3 * ease;
          break;
        case "zoom-out":
          opacity = ease;
          scaleValue = 1.3 - 0.3 * ease;
          break;
        case "pop":
          opacity = ease;
          scaleValue = 0.5 + 0.5 * p; // spring overshoot gives the pop
          break;
      }
    }

    if (loop) {
      const wave = Math.sin(2 * Math.PI * t);
      switch (loop.type) {
        case "pulse":
          scaleValue *= 1 + 0.05 * wave;
          break;
        case "float":
          translateY += 12 * scale * wave;
          break;
        case "wiggle":
          rotate += 3 * wave;
          break;
        case "spin":
          rotate += 360 * t;
          break;
      }
    }

    return {
      opacity,
      transform: [
        { translateX },
        { translateY },
        { scale: scaleValue },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <Animated.View style={[style, animated]}>{children}</Animated.View>
  );
}
