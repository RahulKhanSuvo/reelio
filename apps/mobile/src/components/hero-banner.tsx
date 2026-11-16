import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Platform, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { colors, radius, spacing } from "@/theme";

const DISPLAY_FONT = Platform.select({ ios: "Georgia", android: "serif", default: "Georgia" });

/**
 * Full-bleed photo hero with decorative display title and the
 * white "Create Reels" pill — matches the reference home.
 */
export function HeroBanner({
  image,
  title = "Autumn Reels",
  onCreate,
}: {
  image?: string;
  title?: string;
  onCreate?: () => void;
}) {
  return (
    <View style={styles.hero}>
      {image ? (
        <Image source={{ uri: image }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : (
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["#2a2a2e", "#141416"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}

      {/* readability scrim */}
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.05)", "rgba(0,0,0,0.6)"]}
        locations={[0, 0.45, 1]}
      />

      <View style={styles.copy}>
        <ThemedText style={styles.script}>Create</ThemedText>
        <ThemedText style={styles.display}>{title}</ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create Reels"
          onPress={onCreate}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
        >
          <ThemedText style={styles.ctaLabel}>Create Reels</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 560, backgroundColor: colors.surface },
  copy: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.xl,
  },
  script: {
    fontFamily: DISPLAY_FONT,
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 46,
    color: colors.label,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 2 },
  },
  display: {
    fontFamily: DISPLAY_FONT,
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 54,
    lineHeight: 60,
    color: colors.label,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowRadius: 14,
    textShadowOffset: { width: 0, height: 2 },
  },
  cta: {
    alignSelf: "center",
    marginTop: spacing.lg,
    backgroundColor: colors.label,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl - 4,
    paddingVertical: spacing.md - 4,
  },
  ctaLabel: {
    color: colors.bg,
    fontWeight: "800",
    fontSize: 17,
  },
});
