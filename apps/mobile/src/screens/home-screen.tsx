import { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Chip } from "@/components/chip";
import { HeroBanner } from "@/components/hero-banner";
import { TemplateCard } from "@/components/template-card";
import { FilterCard, type FilterPreset } from "@/components/filter-card";
import { SectionHeader } from "@/components/section-header";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { trendingTemplates, CATEGORIES, type Category } from "@/data/templates";
import { filterPresets } from "@/data/filters";
import { colors, spacing } from "@/theme";

const CARD_WIDTH = 210;

export function HomeScreen() {
  const [category, setCategory] = useState<Category>("For You");

  const trending = useMemo(() => trendingTemplates(category), [category]);

  const onCreate = () =>
    Alert.alert("Create", "The editor flow is coming next — templates first, then export.");

  const onUseTemplate = (name: string) =>
    Alert.alert(
      "Use template",
      `“${name}” opens in the editor — coming next. Templates browsing is live now.`
    );

  const onFilter = (filter: FilterPreset) =>
    Alert.alert("Filters", `“${filter.name}” applies during export — coming next.`);

  return (
    <View style={styles.screen}>
      <FlatList
        data={trending}
        keyExtractor={(entry) => entry.template.id}
        renderItem={({ item }) => (
          <TemplateCard
            template={item.template}
            width={CARD_WIDTH}
            pro={item.pro}
            onPress={() => onUseTemplate(item.template.name)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingContent}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            {/* category top tabs */}
            <View style={styles.categories}>
              {CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  variant="ghost"
                  active={item === category}
                  onPress={() => setCategory(item)}
                />
              ))}
            </View>

            <View style={styles.titleBlock}>
              <ThemedText variant="largeTitle">Reels</ThemedText>
              <ThemedText variant="subhead" style={styles.tagline}>
                Templates for Instagram stories &amp; reels
              </ThemedText>
            </View>

            <HeroBanner onCreate={onCreate} />

            <SectionHeader
              title="Trending 🔥"
              onPress={() => setCategory("For You")}
            />
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerBlock}>
            <SectionHeader title="Filters" onPress={() => onFilter(filterPresets[0])} />
            <FlatList
              data={filterPresets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <FilterCard filter={item} size={120} onPress={() => onFilter(item)} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContent}
            />
          </View>
        }
      />

      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  categories: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  titleBlock: { gap: spacing.xs },
  tagline: { color: colors.labelSecondary },
  trendingContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xs,
  },
  footerBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 140,
    gap: spacing.md,
  },
  filtersContent: { gap: spacing.md, paddingBottom: spacing.xs },
});
