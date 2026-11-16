import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import "../../global.css";
import { colors } from "@/theme";

export default function RootLayout() {
  useEffect(() => {
    // the app is a fixed dark design — never let the white window
    // background show through during layout transitions
    SystemUI.setBackgroundColorAsync("#000000");
  }, []);

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
