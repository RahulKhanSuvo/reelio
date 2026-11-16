import { ThemedText } from "./themed-text";

/**
 * "PRO" marker. `accent` = yellow pill (page chrome);
 * `overlay` = dark pill over cards/previews.
 */
export function ProBadge({
  variant = "overlay",
  className,
}: {
  variant?: "accent" | "overlay";
  className?: string;
}) {
  return (
    <ThemedText
      variant="caption"
      className={[
        "overflow-hidden rounded-full px-3 py-1.5 font-extrabold",
        variant === "accent" ? "bg-accent text-on-accent" : "bg-overlay text-label",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      PRO
    </ThemedText>
  );
}
