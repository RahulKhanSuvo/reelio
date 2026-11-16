import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // custom FloatingTabBar is rendered inside each screen
        tabBarStyle: { display: "none" },
        sceneStyle: { backgroundColor: "#000000" },
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="guides" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
