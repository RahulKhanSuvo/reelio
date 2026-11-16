import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { ProBadge } from "./pro-badge";
import { ThemedText } from "./themed-text";
import { radius, spacing } from "@/theme";

export type FilterPreset = {
  id: string;
  name: string;
  /** demo photo; real filtered output comes with the filter engine */
  image?: string;
  /** gradient fallback when no photo is available */
  swatch: [string, string];
};

/** Portrait photo card in the "Filters" row: name bottom-left, PRO top-right. */
export function FilterCard({
  filter,
  width = 150,
  height = 200,
  onPress,
  style,
}: {
  filter: FilterPreset;
  width?: number;
  height?: number;
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
        style={[styles.card, { width, height }]}
      >
        {filter.image ? (
          <Image source={{ uri: filter.image }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : null}
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["transparent", "rgba(0,0,0,0.55)"]}
          locations={[0.55, 1]}
        />
        <ProBadge variant="overlay" style={styles.pro} />
        <ThemedText style={styles.name} numberOfLines={1}>
          {filter.name}
        </ThemedText>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, overflow: "hidden" },
  pro: { position: "absolute", top: spacing.sm, right: spacing.sm },
  name: {
    position: "absolute",
    bottom: spacing.sm + 2,
    left: spacing.sm + 2,
    right: spacing.sm,
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
