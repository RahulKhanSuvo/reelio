import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";

type Variant = "solid" | "ghost";

/**
 * Category chip. `solid` = pill (guides, editor sheets);
 * `ghost` = text-only tab (home top tabs).
 */
export function Chip({
  label,
  active = false,
  onPress,
  variant = "solid",
  className,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  className?: string;
}) {
  if (variant === "ghost") {
    return (
      <Pressable
        onPress={onPress}
        className={["active:opacity-70", className].filter(Boolean).join(" ")}
      >
        <ThemedText
          className={`text-[17px] font-bold ${active ? "text-label" : "text-label-tertiary"}`}
        >
          {label}
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className={[
        "rounded-full px-5 py-2.5 active:opacity-80",
        active ? "bg-accent" : "bg-surface-raised",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ThemedText
        className={`text-[15px] font-bold ${active ? "text-on-accent" : "text-label"}`}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}
