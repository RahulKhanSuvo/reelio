import { Text, type TextProps } from "react-native";

const VARIANTS = {
  largeTitle: "text-[32px] font-extrabold text-label",
  title: "text-[26px] font-bold text-label",
  headline: "text-[17px] font-semibold text-label",
  body: "text-[15px] text-label",
  subhead: "text-[13px] text-label-secondary",
  caption: "text-[12px] text-label-secondary",
} as const;

type Variant = keyof typeof VARIANTS;

export function ThemedText({
  variant = "body",
  className,
  style,
  ...props
}: TextProps & { variant?: Variant; className?: string }) {
  return (
    <Text
      className={className ? `${VARIANTS[variant]} ${className}` : VARIANTS[variant]}
      style={style}
      {...props}
    />
  );
}
