import i18n, { changeAppLanguage } from "@/src/utils/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSettingsStore } from "@/src/store/settingsStore";

export default function RootLayout() {
  const { language } = useSettingsStore.getState();
  changeAppLanguage(language);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={new QueryClient()}>
        <I18nextProvider i18n={i18n}>
          <StatusBar hidden={true} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="home" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="settings" />
          </Stack>
        </I18nextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
