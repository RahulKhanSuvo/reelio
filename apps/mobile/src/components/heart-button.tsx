import { useState } from "react";
import { Heart } from "lucide-react-native";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "@/theme";

/** Round white favorite button used on cards and sheet cells. */
export function HeartButton({
  size = 36,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={liked ? "Unlike" : "Like"}
      accessibilityState={{ selected: liked }}
      onPress={() => setLiked((value) => !value)}
      className={["items-center justify-center rounded-full bg-label active:opacity-80", className]
        .filter(Boolean)
        .join(" ")}
      style={[{ width: size, height: size }, style]}
    >
      <Heart
        size={size * 0.5}
        color={colors.label}
        fill={liked ? colors.label : "transparent"}
      />
    </Pressable>
  );
}
