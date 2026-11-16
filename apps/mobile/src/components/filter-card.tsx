import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

export type FilterPreset = {
  id: string;
  name: string;
  /** gradient stand-in until real LUT previews exist */
  swatch: [string, string];
};

/** Small square card in the "Filters" row showing a filter swatch + name. */
export function FilterCard({
  filter,
  size = 120,
  onPress,
  style,
}: {
  filter: FilterPreset;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Filter ${filter.name}`}
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.85 }, style]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={filter.swatch}
        style={[styles.swatch, { width: size, height: size, boxShadow: shadows.raised }]}
      />
      <ThemedText variant="caption" numberOfLines={1} style={styles.name}>
        {filter.name}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  swatch: { borderRadius: radius.md },
  name: { marginTop: spacing.sm, color: colors.labelSecondary },
});
