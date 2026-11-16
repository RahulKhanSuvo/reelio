import { useMemo, useState } from "react";
import { Alert, FlatList, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Chip } from "@/components/chip";
import { HeartButton } from "@/components/heart-button";
import { ProBadge } from "@/components/pro-badge";
import { HeroBanner } from "@/components/hero-banner";
import { TemplateCard } from "@/components/template-card";
import { FilterCard, type FilterPreset } from "@/components/filter-card";
import { SectionHeader } from "@/components/section-header";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { trendingTemplates, type Category } from "@/data/templates";
import { filterPresets } from "@/data/filters";
import { heroImage } from "@/data/images";
import { spacing } from "@/theme";

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
    <ScrollView className="flex-1 bg-bg" contentContainerClassName="pb-[150px]">
      {/* full-bleed hero */}
      <View className="bg-bg">
        <HeroBanner image={heroImage} onCreate={onCreate} />

        {/* chrome floats over the photo */}
        <View
          className="absolute inset-0 flex-row items-center gap-2 px-6"
          style={{ paddingTop: insets.top + spacing.sm }}
        >
          <ProBadge variant="accent" />
          <HeartButton size={38} />
          {/*<FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Chip
                label={item}
                variant="ghost"
                active={item === category}
                onPress={() => setCategory(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex-row gap-6 grow"
            style={{ flexGrow: 1 }}
          />*/}
        </View>
      </View>

      {/* rounded content sheet overlapping the hero */}
      <View className="-mt-6 gap-6 rounded-t-3xl bg-bg pt-6">
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
          contentContainerClassName="gap-4 py-1"
        />

        <SectionHeader
          title="Filters"
          subtitle="Every look we've made, all in one scroll — find the perfect vibe"
          onPress={() => onFilter(filterPresets[0])}
        />
        <FlatList
          data={filterPresets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FilterCard filter={item} onPress={() => onFilter(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-4 py-1"
        />
      </View>

      <FloatingTabBar />
    </ScrollView>
  );
}
