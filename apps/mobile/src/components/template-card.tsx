import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import type { Template } from "@reelio/template-schema";
import { TemplateCanvas } from "./template-canvas";
import { HeartButton } from "./heart-button";
import { ProBadge } from "./pro-badge";
import { ThemedText } from "./themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

/**
 * A template preview card: live-rendered TemplateCanvas + heart + optional
 * PRO badge + name row. Used in the trending row, picker carousel and
 * change-template sheet.
 */
export function TemplateCard({
  template,
  width,
  pro = false,
  showName = true,
  onPress,
  style,
}: {
  template: Template;
  /** card (canvas) width in points */
  width: number;
  pro?: boolean;
  showName?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const height = (width / 9) * 16;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Use template ${template.name}`}
      onPress={onPress}
      style={({ pressed }) => [pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }, style]}
    >
      <View style={[styles.canvas, { width, height }]}>
        <TemplateCanvas template={template} width={width} preview />
        {pro ? (
          <ProBadge variant="overlay" style={styles.badge} />
        ) : null}
        <HeartButton size={36} style={styles.heart} />
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
    boxShadow: shadows.overlay,
  },
  badge: { position: "absolute", top: spacing.sm, left: spacing.sm },
  heart: { position: "absolute", top: spacing.sm, right: spacing.sm },
  name: {
    marginTop: spacing.sm,
    color: colors.labelSecondary,
  },
});
