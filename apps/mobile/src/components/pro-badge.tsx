import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, spacing } from "@/theme";

/**
 * "PRO" marker. `accent` = yellow pill (page chrome);
 * `overlay` = dark pill over cards/previews.
 */
export function ProBadge({
  variant = "overlay",
  style,
}: {
  variant?: "accent" | "overlay";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <ThemedText
      variant="caption"
      style={[
        styles.badge,
        {
          backgroundColor: variant === "accent" ? colors.accent : colors.overlay,
          color: variant === "accent" ? colors.onAccent : colors.label,
        },
        style,
      ]}
    >
      PRO
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontWeight: "800",
    borderRadius: radius.full,
    overflow: "hidden",
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
  },
});
