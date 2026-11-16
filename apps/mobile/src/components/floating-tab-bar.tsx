import { BlurView } from "expo-blur";
import { Compass, Home, Plus, User } from "lucide-react-native";
import { usePathname, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./themed-text";
import { colors, radius, shadows, spacing } from "@/theme";

type TabDef = {
  route: string;
  label: string;
  Icon: typeof Home;
};

const TABS: TabDef[] = [
  { route: "/", label: "Home", Icon: Home },
  { route: "/guides", label: "Guides", Icon: Compass },
  { route: "/profile", label: "Profile", Icon: User },
];

/**
 * Floating glass tab bar with a raised center "create" button.
 * Rendered inside each tab screen's layout; the native bar is hidden.
 */
export function FloatingTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const activeFor = (route: string) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { bottom: insets.bottom + spacing.sm }]}
    >
      <BlurView intensity={40} tint="dark" style={styles.bar}>
        <View style={styles.tabs}>
          <TabButton tab={TABS[0]} active={activeFor(TABS[0].route)} onPress={router.navigate} />
          <TabButton tab={TABS[1]} active={activeFor(TABS[1].route)} onPress={router.navigate} />

          {/* raised center create button */}
          <View style={styles.centerSlot}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Create"
              onPress={() =>
                Alert.alert(
                  "Create",
                  "The editor is coming next — pick a template from Home for now."
                )
              }
              style={({ pressed }) => [styles.create, pressed && { opacity: 0.85 }]}
            >
              <Plus size={26} color={colors.onAccent} strokeWidth={3} />
            </Pressable>
          </View>

          <TabButton tab={TABS[2]} active={activeFor(TABS[2].route)} onPress={router.navigate} />
        </View>
      </BlurView>
    </View>
  );
}

function TabButton({
  tab,
  active,
  onPress,
}: {
  tab: TabDef;
  active: boolean;
  onPress: (href: never) => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={() => onPress(tab.route as never)}
      style={({ pressed }) => [styles.tab, pressed && { opacity: 0.7 }]}
    >
      <tab.Icon
        size={22}
        color={active ? colors.accent : colors.labelSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
      <ThemedText
        variant="caption"
        style={[styles.tabLabel, { color: active ? colors.accent : colors.labelSecondary }]}
      >
        {tab.label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bar: {
    overflow: "hidden",
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    backgroundColor: "rgba(20,20,22,0.75)",
    boxShadow: shadows.overlay,
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  tab: {
    width: 88,
    alignItems: "center",
    gap: 2,
    paddingVertical: spacing.xs,
  },
  tabLabel: { fontWeight: "700" },
  centerSlot: {
    width: 64,
    alignItems: "center",
  },
  create: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md + 4,
    marginTop: -spacing.md - 8,
    borderWidth: 4,
    borderColor: "#000000",
    boxShadow: shadows.overlay,
  },
});
