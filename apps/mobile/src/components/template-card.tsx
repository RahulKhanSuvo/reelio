import { Image } from "expo-image";
import { Image as PhotoIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { getPhotoSlots, type Template } from "@reelio/template-schema";
import { TemplateCanvas } from "./template-canvas";
import { HeartButton } from "./heart-button";
import { ThemedText } from "./themed-text";
import { colors, radius, spacing } from "@/theme";

/**
 * A template card: photo thumbnail (or live TemplateCanvas fallback),
 * heart top-right, photo-slot count bottom-left, plain PRO bottom-right.
 * Used in the trending row, picker carousel and change-template sheet.
 */
export function TemplateCard({
  template,
  width,
  image,
  pro = false,
  showName = false,
  onPress,
  style,
}: {
  template: Template;
  /** card width in points; height follows the 9:16 aspect */
  width: number;
  /** thumbnail override; falls back to rendering the template itself */
  image?: string;
  pro?: boolean;
  showName?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const height = (width / 9) * 16;
  const slotCount = getPhotoSlots(template).length;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Use template ${template.name}`}
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }, style]}
    >
      <View style={[styles.canvas, { width, height }]}>
        {image ? (
          <Image source={{ uri: image }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : (
          <TemplateCanvas template={template} width={width} preview />
        )}

        <HeartButton size={30} style={styles.heart} />

        <View style={styles.countBadge}>
          <PhotoIcon size={12} color={colors.label} />
          <ThemedText variant="caption" style={styles.countText}>
            {slotCount}
          </ThemedText>
        </View>

        {pro ? <ThemedText style={styles.pro}>PRO</ThemedText> : null}
      </View>
      {showName ? (
        <ThemedText variant="subhead" numberOfLines={1} style={styles.name}>
          {template.name}
        </ThemedText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  canvas: {
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  heart: { position: "absolute", top: spacing.sm, right: spacing.sm },
  countBadge: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  countText: { color: colors.label, fontWeight: "700" },
  pro: {
    position: "absolute",
    bottom: spacing.sm,
    right: spacing.sm,
    color: colors.label,
    fontWeight: "800",
    fontSize: 13,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 1 },
  },
  name: { marginTop: spacing.sm, color: colors.labelSecondary },
});
