import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, spacing } from "@/theme";

/** Section title with optional subtitle and circular "see all" chevron. */
export function SectionHeader({
  title,
  subtitle,
  onPress,
  style,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.text}>
        <ThemedText variant="title">{title}</ThemedText>
        {subtitle ? (
          <ThemedText variant="subhead" numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
          onPress={onPress}
          style={({ pressed }) => [styles.chevron, pressed && { opacity: 0.7 }]}
        >
          <ChevronRight size={18} color={colors.labelSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  text: { flex: 1, gap: spacing.xs },
  subtitle: { color: colors.labelSecondary },
  chevron: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
