import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, Crown, Heart, Settings2 } from "lucide-react-native";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { colors, spacing } from "@/theme";

/** Profile tab — dark placeholder styled to the reference until accounts ship. */
export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-bg" style={{ paddingTop: insets.top + spacing.lg }}>
      <ThemedText variant="largeTitle" className="px-6">
        Profile
      </ThemedText>

      <View className="mx-6 mt-6 flex-row items-center gap-4 rounded-lg bg-surface p-6">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-surface-raised">
          <ThemedText className="text-[22px] font-extrabold text-accent">R</ThemedText>
        </View>
        <View className="flex-1 gap-1">
          <ThemedText variant="headline">Reelio Creator</ThemedText>
          <ThemedText variant="subhead">Sign in to save likes &amp; exports</ThemedText>
        </View>
      </View>

      <View className="mx-6 mt-6 rounded-lg bg-surface py-2">
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
    <View className="flex-row items-center gap-4 px-6 py-3.5">
      {icon}
      <ThemedText variant="body" className="flex-1">
        {label}
      </ThemedText>
    </View>
  );
}
