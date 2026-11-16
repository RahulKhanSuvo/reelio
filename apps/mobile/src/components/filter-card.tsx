import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet } from "react-native";
import { ProBadge } from "./pro-badge";
import { ThemedText } from "./themed-text";

export type FilterPreset = {
  id: string;
  name: string;
  /** demo photo; real filtered output comes with the filter engine */
  image?: string;
  /** gradient fallback when no photo is available */
  swatch: [string, string];
};

/** Portrait photo card in the "Filters" row: name bottom-left, PRO top-right. */
export function FilterCard({
  filter,
  width = 150,
  height = 200,
  onPress,
  style,
}: {
  filter: FilterPreset;
  width?: number;
  height?: number;
  onPress?: () => void;
  style?: Parameters<typeof Pressable>[0]["style"];
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Filter ${filter.name}`}
      onPress={onPress}
      className="active:opacity-85"
      style={style}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={filter.swatch}
        className="overflow-hidden rounded-md"
        style={{ width, height }}
      >
        {filter.image ? (
          <Image source={{ uri: filter.image }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : null}
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["transparent", "rgba(0,0,0,0.55)"]}
          locations={[0.55, 1]}
        />
        <ProBadge variant="overlay" className="absolute top-2 right-2" />
        <ThemedText
          numberOfLines={1}
          className="absolute bottom-2.5 left-2.5 right-2 text-[14px] font-bold text-white"
        >
          {filter.name}
        </ThemedText>
      </LinearGradient>
    </Pressable>
  );
}
