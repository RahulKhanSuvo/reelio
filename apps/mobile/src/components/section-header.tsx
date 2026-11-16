import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import { colors } from "@/theme";

/** Section title with optional subtitle and circular "see all" chevron. */
export function SectionHeader({
  title,
  subtitle,
  onPress,
  className,
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <View
      className={["flex-row items-center justify-between gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <View className="flex-1 gap-1">
        <ThemedText variant="title">{title}</ThemedText>
        {subtitle ? (
          <ThemedText variant="subhead" numberOfLines={1}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`See all ${title}`}
          onPress={onPress}
          className="h-9 w-9 items-center justify-center active:opacity-70"
        >
          <ChevronRight size={18} color={colors.labelSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}
