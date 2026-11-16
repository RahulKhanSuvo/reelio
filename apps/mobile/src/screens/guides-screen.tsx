import { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Chip } from "@/components/chip";
import { GuideCard } from "@/components/guide-card";
import { SectionHeader } from "@/components/section-header";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { featuredGuides, guideRows, GUIDE_CATEGORIES, type GuideCategory } from "@/data/guides";
import { colors, spacing } from "@/theme";

export function GuidesScreen() {
  const [category, setCategory] = useState<GuideCategory>("For You");

  const rows = useMemo(() => guideRows, []);
  const onOpen = (title: string) => Alert.alert("Guides", `“${title}” opens here — coming next.`);

  return (
    <View style={styles.screen}>
      <FlatList
        data={rows}
        keyExtractor={(guide) => guide.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        renderItem={({ item }) => <GuideCard guide={item} variant="row" style={styles.rowCard} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.titleBlock}>
              <ThemedText variant="largeTitle">Guides</ThemedText>
              <ThemedText variant="subhead" style={styles.tagline}>
                Level up your reels, step by step
              </ThemedText>
            </View>

            <View style={styles.categories}>
              {GUIDE_CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={item === category}
                  onPress={() => setCategory(item)}
                />
              ))}
            </View>

            <SectionHeader title="Featured" />
            {featuredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                variant="featured"
                onPress={() => onOpen(guide.title)}
              />
            ))}
            <SectionHeader title="All guides" />
          </View>
        }
      />

      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 140,
    gap: spacing.md,
  },
  headerBlock: { gap: spacing.lg, paddingTop: spacing.xl },
  titleBlock: { gap: spacing.xs },
  tagline: { color: colors.labelSecondary },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  column: { gap: spacing.md },
  rowCard: { flex: 1 },
});
