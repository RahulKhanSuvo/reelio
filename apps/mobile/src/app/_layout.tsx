import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
