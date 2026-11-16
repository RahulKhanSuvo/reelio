import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, Crown, Heart, Settings2 } from "lucide-react-native";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

/** Profile tab — dark placeholder styled to the reference until accounts ship. */
export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.lg }]}>
      <ThemedText variant="largeTitle" style={styles.title}>
        Profile
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>R</ThemedText>
        </View>
        <View style={styles.copy}>
          <ThemedText variant="headline">Reelio Creator</ThemedText>
          <ThemedText variant="subhead">Sign in to save likes &amp; exports</ThemedText>
        </View>
      </View>

      <View style={styles.list}>
        <ProfileRow icon={<Crown size={20} color={colors.accent} />} label="Reelio PRO" />
        <ProfileRow icon={<Heart size={20} color={colors.label} />} label="Liked templates" />
        <ProfileRow icon={<Camera size={20} color={colors.label} />} label="My exports" />
        <ProfileRow icon={<Settings2 size={20} color={colors.label} />} label="Settings" />
      </View>

      <FloatingTabBar />
    </View>
  );
}

function ProfileRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.row}>
      {icon}
      <ThemedText variant="body" style={styles.rowLabel}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { paddingHorizontal: spacing.lg },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadows.card,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.accent, fontWeight: "800", fontSize: 22 },
  copy: { gap: spacing.xs, flex: 1 },
  list: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
  },
  rowLabel: { flex: 1 },
});
