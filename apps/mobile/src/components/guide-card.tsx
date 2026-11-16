import { Image } from "expo-image";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

export type Guide = {
  id: string;
  title: string;
  subtitle?: string;
  /** art source; falls back to a tinted panel when omitted */
  image?: string;
};

/**
 * Guide article card. `featured` = big card (full width);
 * `row` = small card for the 2-column grid.
 */
export function GuideCard({
  guide,
  variant = "featured",
  onPress,
  style,
}: {
  guide: Guide;
  variant?: "featured" | "row";
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const featured = variant === "featured";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Guide: ${guide.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        featured ? styles.featured : styles.row,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {guide.image ? (
        <Image source={{ uri: guide.image }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : null}
      <View style={[styles.overlay, featured && styles.overlayFeatured]} />
      <View style={featured ? styles.copy : styles.copyRow}>
        <ThemedText
          style={[styles.title, featured ? styles.titleFeatured : styles.titleRow]}
          numberOfLines={featured ? 2 : 3}
        >
          {guide.title}
        </ThemedText>
        {featured && guide.subtitle ? (
          <ThemedText variant="caption" numberOfLines={1} style={styles.subtitle}>
            {guide.subtitle}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    boxShadow: shadows.raised,
  },
  featured: { height: 190 },
  row: { height: 150 },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  overlayFeatured: {
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  copy: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  copyRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.md - 2,
  },
  title: { color: colors.label, fontWeight: "700" },
  titleFeatured: { fontSize: 20 },
  titleRow: { fontSize: 14 },
  subtitle: { color: colors.labelSecondary },
});
