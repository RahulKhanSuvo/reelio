import { StyleSheet, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";
import Animated from "react-native-reanimated";
import {
  type PhotoLayer,
  type StickerLayer,
  type Template,
  type TextLayer,
  type TemplateBackground,
} from "@reelio/template-schema";
import { AnimatedLayer } from "./animated-layer";
import { colors, radius as themeRadius } from "@/theme";

export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1920;

/** User-filled photos keyed by the template's photo slotId. */
export type PhotoOverrides = Record<string, string | null | undefined>;

const FONT_WEIGHT: Record<string, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900",
};

/**
 * CSS gradient angle (degrees, 0 = to top, clockwise) → LinearGradient
 * start/end points, per the expo-linear-gradient docs formula.
 */
function gradientPoints(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    start: { x: 0.5 - Math.sin(rad) / 2, y: 0.5 + Math.cos(rad) / 2 },
    end: { x: 0.5 + Math.sin(rad) / 2, y: 0.5 - Math.cos(rad) / 2 },
  };
}

function Background({ background, scale }: { background: TemplateBackground; scale: number }) {
  if (background.type === "gradient") {
    const { start, end } = gradientPoints(background.angle);
    return (
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={start}
        end={end}
        colors={background.colors as [string, string, ...string[]]}
      />
    );
  }
  if (background.type === "image") {
    return (
      <Image
        source={{ uri: background.src }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
    );
  }
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: background.color }]} />;
}

function PhotoLayerView({
  layer,
  scale,
  photo,
  preview,
  animate,
}: {
  layer: PhotoLayer;
  scale: number;
  photo?: string | null;
  preview?: boolean;
  animate?: boolean;
}) {
  const { frame } = layer;
  const filled = preview || !!photo;

  const body = (
    <View
      style={{
        position: "absolute",
        left: frame.x * scale,
        top: frame.y * scale,
        width: frame.width * scale,
        height: frame.height * scale,
        borderRadius: layer.radius * scale,
        overflow: "hidden",
        backgroundColor: filled ? colors.surfaceRaised : colors.surfaceSoft,
        borderWidth: filled ? 0 : 2 * scale,
        borderColor: colors.labelTertiary,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: `${frame.rotation}deg` }],
      }}
    >
      {filled ? (
        <Image
          source={{ uri: photo ?? undefined }}
          style={StyleSheet.absoluteFill}
          contentFit={layer.fit === "contain" ? "contain" : "cover"}
        />
      ) : (
        <Plus size={56 * scale} color={colors.labelSecondary} strokeWidth={3} />
      )}
    </View>
  );

  if (!animate || !layer.animation) return body;
  return (
    <AnimatedLayer animation={layer.animation} scale={scale} style={styles.static}>
      {body}
    </AnimatedLayer>
  );
}

function TextLayerView({
  layer,
  scale,
  animate,
}: {
  layer: TextLayer;
  scale: number;
  animate?: boolean;
}) {
  const { frame, style } = layer;
  const body = (
    <Animated.Text
      numberOfLines={3}
      style={[
        {
          position: "absolute",
          left: frame.x * scale,
          top: frame.y * scale,
          width: frame.width * scale,
          height: frame.height * scale,
          fontSize: style.fontSize * scale,
          lineHeight: style.fontSize * style.lineHeight * scale,
          letterSpacing: style.letterSpacing * scale,
          color: style.color,
          fontWeight: FONT_WEIGHT[style.fontWeight] ?? "700",
          textAlign: style.align,
          textTransform: style.uppercase ? "uppercase" : "none",
          transform: [{ rotate: `${frame.rotation}deg` }],
          ...(style.shadow
            ? {
                textShadowColor: style.shadow.color,
                textShadowRadius: style.shadow.blur * scale,
                textShadowOffset: { width: 0, height: style.shadow.offsetY * scale },
              }
            : null),
        },
      ]}
    >
      {layer.text}
    </Animated.Text>
  );

  if (!animate || !layer.animation) return body;
  return (
    <AnimatedLayer animation={layer.animation} scale={scale} style={styles.static}>
      {body}
    </AnimatedLayer>
  );
}

function StickerLayerView({
  layer,
  scale,
  animate,
}: {
  layer: StickerLayer;
  scale: number;
  animate?: boolean;
}) {
  const { frame } = layer;
  const body = (
    <Image
      source={{ uri: layer.src }}
      style={{
        position: "absolute",
        left: frame.x * scale,
        top: frame.y * scale,
        width: frame.width * scale,
        height: frame.height * scale,
        transform: [{ rotate: `${frame.rotation}deg` }],
      }}
      contentFit="contain"
    />
  );

  if (!animate || !layer.animation) return body;
  return (
    <AnimatedLayer animation={layer.animation} scale={scale} style={styles.static}>
      {body}
    </AnimatedLayer>
  );
}

/**
 * Renders a full template JSON on a 9:16 canvas, scaled to any width.
 *
 * - `photoOverrides` binds user-selected photos to slots (slotId → uri)
 * - `preview` fills empty slots with a placeholder instead of "+"
 * - `animate` runs the template's entrance/loop animations (editor only;
 *   leave off in scroll lists for performance)
 */
export function TemplateCanvas({
  template,
  width,
  photoOverrides,
  preview = false,
  animate = false,
  style,
}: {
  template: Template;
  /** rendered width in points; height follows the 9:16 aspect */
  width: number;
  photoOverrides?: PhotoOverrides;
  preview?: boolean;
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = width / CANVAS_WIDTH;
  const height = CANVAS_HEIGHT * scale;

  return (
    <View style={[{ width, height, overflow: "hidden", borderRadius: themeRadius.md }, style]}>
      <Background background={template.background} scale={scale} />
      {template.layers.map((layer) => {
        switch (layer.type) {
          case "photo":
            return (
              <PhotoLayerView
                key={layer.id}
                layer={layer}
                scale={scale}
                photo={photoOverrides?.[layer.slotId]}
                preview={preview}
                animate={animate}
              />
            );
          case "text":
            return (
              <TextLayerView key={layer.id} layer={layer} scale={scale} animate={animate} />
            );
          case "sticker":
            return (
              <StickerLayerView key={layer.id} layer={layer} scale={scale} animate={animate} />
            );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  static: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%" },
});
