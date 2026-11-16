import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Platform, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

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
    <View className="h-[560px] bg-surface">
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

      <View className="absolute inset-0 items-center justify-center pb-8">
        <ThemedText
          className="text-[46px] italic text-label"
          style={{
            fontFamily: DISPLAY_FONT,
            textShadowColor: "rgba(0,0,0,0.4)",
            textShadowRadius: 12,
            textShadowOffset: { width: 0, height: 2 },
          }}
        >
          Create
        </ThemedText>
        <ThemedText
          className="text-center text-[54px] font-bold italic leading-[60px] text-label"
          style={{
            fontFamily: DISPLAY_FONT,
            textShadowColor: "rgba(0,0,0,0.45)",
            textShadowRadius: 14,
            textShadowOffset: { width: 0, height: 2 },
          }}
        >
          {title}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create Reels"
          onPress={onCreate}
          className={[
            "mt-6 self-center rounded-full bg-label px-7 py-3 active:opacity-85",
          ].join(" ")}
        >
          <ThemedText className="text-[17px] font-extrabold text-bg">Create Reels</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}
