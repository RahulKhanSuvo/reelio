import { useMemo, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "@/components/chip";
import { HeartButton } from "@/components/heart-button";
import { ProBadge } from "@/components/pro-badge";
import { HeroBanner } from "@/components/hero-banner";
import { TemplateCard } from "@/components/template-card";
import { FilterCard, type FilterPreset } from "@/components/filter-card";
import { SectionHeader } from "@/components/section-header";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { trendingTemplates, CATEGORIES, type Category } from "@/data/templates";
import { filterPresets } from "@/data/filters";
import { heroImage } from "@/data/images";
import { colors, radius, spacing } from "@/theme";

const CARD_WIDTH = 128;

export function HomeScreen() {
  const insets = useSafeAreaInsets();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* full-bleed hero */}
        <View style={styles.hero}>
          <HeroBanner image={heroImage} onCreate={onCreate} />

          {/* chrome floats over the photo */}
          <View style={[styles.chrome, { paddingTop: insets.top + spacing.sm }]}>
            <ProBadge variant="accent" />
            <HeartButton size={38} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
            >
              {CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  variant="ghost"
                  active={item === category}
                  onPress={() => setCategory(item)}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* rounded content sheet overlapping the hero */}
        <View style={styles.sheet}>
          <SectionHeader title="Trending 🔥" onPress={() => setCategory("For You")} />
          <FlatList
            data={trending}
            keyExtractor={(entry) => entry.template.id}
            renderItem={({ item }) => (
              <TemplateCard
                template={item.template}
                width={CARD_WIDTH}
                image={item.image}
                pro={item.pro}
                onPress={() => onUseTemplate(item.template.name)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rowContent}
          />

          <SectionHeader
            title="Filters"
            subtitle="Every look we've made, all in one scroll — find the perfect vibe"
            onPress={() => onFilter(filterPresets[0])}
          />
          <FlatList
            data={filterPresets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FilterCard filter={item} onPress={() => onFilter(item)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rowContent}
          />
        </View>
      </ScrollView>

      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 150 },
  hero: { backgroundColor: colors.bg },
  chrome: {
    ...StyleSheet.absoluteFill,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  categories: { flexDirection: "row", gap: spacing.lg, flexGrow: 1 },
  sheet: {
    marginTop: -radius.xl,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  rowContent: { gap: spacing.md, paddingVertical: spacing.xs },
});
