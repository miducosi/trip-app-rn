import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';
export type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr';

interface SettingsState {
  mode: ThemeMode;
  isDark: boolean;
  notifications: boolean;
  locationServices: boolean;
  language: SupportedLanguage;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setNotifications: (enabled: boolean) => void;
  setLocationServices: (enabled: boolean) => void;
  setLanguage: (language: SupportedLanguage) => void;
}

const getSystemTheme = (): boolean => {
  // This will be handled by the useThemeColor hook
  return false;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      isDark: false,
      notifications: true,
      locationServices: true,
      language: 'en',
      setThemeMode: (mode: ThemeMode) => {
        const isDark = mode === 'dark' || (mode === 'system' && getSystemTheme());
        set({ mode, isDark });
      },
      toggleTheme: () => {
        const { mode } = get();
        const newMode = mode === 'light' ? 'dark' : 'light';
        const isDark = newMode === 'dark';
        set({ mode: newMode, isDark });
      },
      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled });
      },
      setLocationServices: (enabled: boolean) => {
        set({ locationServices: enabled });
      },
      setLanguage: (language: SupportedLanguage) => {
        set({ language });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
