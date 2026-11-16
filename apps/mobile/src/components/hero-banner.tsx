import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

/** Home hero: gradient panel with the "Create Reels" CTA. */
export function HeroBanner({ onCreate }: { onCreate?: () => void }) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#2a2a2e", "#141416"]}
      style={[styles.banner, { boxShadow: shadows.overlay }]}
    >
      <View style={styles.copy}>
        <ThemedText variant="title" style={styles.title}>
          Make Reels that{"\n"}actually get seen
        </ThemedText>
        <ThemedText variant="subhead" style={styles.subtitle}>
          Ready-made templates. Just drop in{"\n"}your photos and share.
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Create Reels"
        onPress={onCreate}
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
      >
        <Sparkles size={18} color={colors.onAccent} />
        <ThemedText style={styles.ctaLabel}>Create Reels</ThemedText>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  copy: { gap: spacing.xs },
  title: { color: colors.label },
  subtitle: { color: colors.labelSecondary },
  cta: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
    boxShadow: shadows.raised,
  },
  ctaLabel: { color: colors.onAccent, fontWeight: "800", fontSize: 16 },
});
