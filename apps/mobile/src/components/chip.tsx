import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, spacing } from "@/theme";

type Variant = "solid" | "ghost";

/**
 * Category chip. `solid` = pill (guides, editor sheets);
 * `ghost` = text-only tab (home top tabs).
 */
export function Chip({
  label,
  active = false,
  onPress,
  variant = "solid",
  style,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}) {
  if (variant === "ghost") {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.7 }, style]}>
        <ThemedText
          style={[styles.ghost, { color: active ? colors.label : colors.labelTertiary }]}
        >
          {label}
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.solid,
        { backgroundColor: active ? colors.accent : colors.surfaceRaised },
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      <ThemedText
        style={[
          styles.solidLabel,
          { color: active ? colors.onAccent : colors.label },
        ]}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  solid: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg - 4,
    paddingVertical: spacing.sm + 2,
  },
  solidLabel: { fontSize: 15, fontWeight: "700" },
  ghost: { fontSize: 17, fontWeight: "700" },
});
