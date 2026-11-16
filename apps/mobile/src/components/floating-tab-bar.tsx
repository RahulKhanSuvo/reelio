import { BlurView } from "expo-blur";
import { CirclePlus, Compass, House, User } from "lucide-react-native";
import { usePathname, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "@/theme";

type TabDef = {
  route: string;
  label: string;
  Icon: typeof House;
};

const TABS: TabDef[] = [
  { route: "/", label: "Home", Icon: House },
  { route: "/guides", label: "Guides", Icon: Compass },
  { route: "/profile", label: "Profile", Icon: User },
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
      className="absolute left-0 right-0 items-center"
      style={{ bottom: insets.bottom + spacing.sm }}
    >
      <View className="overflow-hidden rounded-full">
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <View className="min-w-[320px] flex-row items-center justify-between rounded-full border border-hairline bg-[rgba(20,20,22,0.72)] px-7 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
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
            className="h-12 w-12 items-center justify-center rounded-full active:opacity-70"
          >
            <CirclePlus size={30} color={colors.label} strokeWidth={1.8} />
          </Pressable>

          <TabButton tab={TABS[1]} active={activeFor(TABS[1].route)} onPress={router.navigate} />
          <TabButton tab={TABS[2]} active={activeFor(TABS[2].route)} onPress={router.navigate} />
        </View>
      </View>
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
      className="h-12 w-12 items-center justify-center rounded-full active:opacity-70"
    >
      <tab.Icon
        size={26}
        color={active ? colors.label : colors.labelSecondary}
        strokeWidth={active ? 2.4 : 2}
      />
    </Pressable>
  );
}
