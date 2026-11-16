import { Image } from "expo-image";
import { Image as PhotoIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { getPhotoSlots, type Template } from "@reelio/template-schema";
import { TemplateCanvas } from "./template-canvas";
import { HeartButton } from "./heart-button";
import { ThemedText } from "./themed-text";
import { colors } from "@/theme";

/**
 * A template card: photo thumbnail (or live TemplateCanvas fallback),
 * heart top-right, photo-slot count bottom-left, plain PRO bottom-right.
 * Used in the trending row, picker carousel and change-template sheet.
 */
export function TemplateCard({
  template,
  width,
  image,
  pro = false,
  showName = false,
  onPress,
  style,
}: {
  template: Template;
  /** card width in points; height follows the 9:16 aspect */
  width: number;
  /** thumbnail override; falls back to rendering the template itself */
  image?: string;
  pro?: boolean;
  showName?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const height = (width / 9) * 16;
  const slotCount = getPhotoSlots(template).length;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Use template ${template.name}`}
      onPress={onPress}
      className="active:scale-[0.98] active:opacity-85"
      style={style}    >
      <View
        className="overflow-hidden rounded-lg bg-surface"
        style={{ width, height }}
      >
        {image ? (
          <Image source={{ uri: image }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : (
          <TemplateCanvas template={template} width={width} preview />
        )}

        <HeartButton size={30} className="absolute top-2 right-2" />

        <View className="absolute bottom-2 left-2 flex-row items-center gap-1 rounded-full bg-black/55 px-2 py-1">
          <PhotoIcon size={12} color={colors.label} />
          <ThemedText variant="caption" className="font-bold text-label">
            {slotCount}
          </ThemedText>
        </View>

        {pro ? (
          <ThemedText
            className="absolute bottom-2 right-2 text-[13px] font-extrabold text-label"
            style={{
              textShadowColor: "rgba(0,0,0,0.6)",
              textShadowRadius: 6,
              textShadowOffset: { width: 0, height: 1 },
            }}
          >
            PRO
          </ThemedText>
        ) : null}
      </View>
      {showName ? (
        <ThemedText variant="subhead" numberOfLines={1} className="mt-2 text-label-secondary">
          {template.name}
        </ThemedText>
      ) : null}
    </Pressable>
  );
}
