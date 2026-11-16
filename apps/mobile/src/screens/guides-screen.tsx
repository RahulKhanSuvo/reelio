import { useMemo, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Chip } from "@/components/chip";
import { GuideCard } from "@/components/guide-card";
import { SectionHeader } from "@/components/section-header";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { ThemedText } from "@/components/themed-text";
import { featuredGuides, guideRows, GUIDE_CATEGORIES, type GuideCategory } from "@/data/guides";

export function GuidesScreen() {
  const [category, setCategory] = useState<GuideCategory>("For You");

  const rows = useMemo(() => guideRows, []);
  const onOpen = (title: string) => Alert.alert("Guides", `“${title}” opens here — coming next.`);

  return (
    <View className="flex-1 bg-bg">
      <FlatList
        data={rows}
        keyExtractor={(guide) => guide.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => <GuideCard guide={item} variant="row" className="flex-1" />}
        contentContainerClassName="gap-4 px-6 pb-[150px]"
        ListHeaderComponent={
          <View className="gap-6 pt-8">
            <View className="gap-1">
              <ThemedText variant="largeTitle">Guides</ThemedText>
              <ThemedText variant="subhead">Level up your reels, step by step</ThemedText>
            </View>

            <View className="flex-row flex-wrap gap-2">
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
