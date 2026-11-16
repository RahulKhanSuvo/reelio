import { BlurView } from "expo-blur";
import { CirclePlus, Compass, House, User } from "lucide-react-native";
import { usePathname, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, shadows, spacing } from "@/theme";

type TabDef = {
  route: string;
  label: string;
  Icon: typeof House;
};

const TABS: TabDef[] = [
  { route: "/", label: "Home", Icon: House },
  { route: "/guides", label: "Guides", Icon: Compass },
];

/**
 * Floating glass tab bar, icon-only (matches the reference), with a
 * circled + create action between the tabs. Native bar is hidden.
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
        <TabButton tab={TABS[0]} active={activeFor(TABS[0].route)} onPress={router.navigate} />

        {/* circled create action */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create"
          onPress={() =>
            Alert.alert(
              "Create",
              "The editor is coming next — pick a template from Trending for now."
            )
          }
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.7 }]}
        >
          <CirclePlus size={30} color={colors.label} strokeWidth={1.8} />
        </Pressable>

        <TabButton tab={TABS[1]} active={activeFor(TABS[1].route)} onPress={router.navigate} />

        <TabButton
          tab={{ route: "/profile", label: "Profile", Icon: User }}
          active={activeFor("/profile")}
          onPress={router.navigate}
        />
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
      accessibilityLabel={tab.label}
      onPress={() => onPress(tab.route as never)}
      style={({ pressed }) => [styles.action, pressed && { opacity: 0.7 }]}
    >
      <tab.Icon
        size={26}
        color={active ? colors.label : colors.labelSecondary}
        strokeWidth={active ? 2.4 : 2}
      />
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
    backgroundColor: "rgba(20,20,22,0.72)",
    boxShadow: shadows.overlay,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl - 4,
    paddingVertical: spacing.md - 4,
    minWidth: 320,
  },
  action: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});
