import { useState } from "react";
import { Heart } from "lucide-react-native";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { colors, radius, shadows } from "@/theme";

/** Round white favorite button used on cards and sheet cells. */
export function HeartButton({
  size = 36,
  style,
}: {
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={liked ? "Unlike" : "Like"}
      accessibilityState={{ selected: liked }}
      onPress={() => setLiked((value) => !value)}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size },
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      <Heart
        size={size * 0.5}
        color={colors.label}
        fill={liked ? colors.label : "transparent"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.full,
    backgroundColor: colors.label,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: shadows.raised,
  },
});
