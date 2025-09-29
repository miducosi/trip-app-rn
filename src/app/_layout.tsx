import i18n, { changeAppLanguage } from "@/src/utils/i18n";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSettingsStore } from "@/src/store/settingsStore";
import Toast from 'react-native-toast-message';
import { showErrorToast } from "@/src/utils/toast";
import { toastConfig } from "@/src/utils/toastConfig";

// Create QueryClient with global error handling
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
      showErrorToast(errorMessage);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
      showErrorToast(errorMessage);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const { language } = useSettingsStore.getState();
  changeAppLanguage(language);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
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
          <Toast config={toastConfig} />
        </I18nextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
