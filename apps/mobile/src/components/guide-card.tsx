import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

export type Guide = {
  id: string;
  title: string;
  subtitle?: string;
  /** art source; falls back to a tinted panel when omitted */
  image?: string;
};

/**
 * Guide article card. `featured` = big card (full width);
 * `row` = small card for the 2-column grid.
 */
export function GuideCard({
  guide,
  variant = "featured",
  onPress,
  className,
}: {
  guide: Guide;
  variant?: "featured" | "row";
  onPress?: () => void;
  className?: string;
}) {
  const featured = variant === "featured";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Guide: ${guide.title}`}
      onPress={onPress}
      className={[
        "overflow-hidden rounded-lg bg-surface active:scale-[0.98] active:opacity-85",
        featured ? "h-[190px]" : "h-[150px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {guide.image ? (
        <Image source={{ uri: guide.image }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : null}
      <View
        className={`absolute inset-0 ${featured ? "bg-black/35" : "bg-overlay"}`}
      />
      <View
        className={`absolute bottom-0 left-0 right-0 ${featured ? "gap-1 p-6" : "p-3.5"}`}
      >
        <ThemedText
          numberOfLines={featured ? 2 : 3}
          className={featured ? "text-[20px] font-bold text-label" : "text-[14px] font-bold text-label"}
        >
          {guide.title}
        </ThemedText>
        {featured && guide.subtitle ? (
          <ThemedText variant="caption" numberOfLines={1} className="text-label-secondary">
            {guide.subtitle}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}
