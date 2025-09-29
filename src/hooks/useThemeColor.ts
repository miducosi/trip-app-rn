/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
    cardBackground: '#fff',
    border: '#e0e0e0',
    shadow: '#000',
  },
  dark: {
    text: '#fff',
    background: '#121212',
    tint: '#fff',
    tabIconDefault: '#666',
    tabIconSelected: '#fff',
    cardBackground: '#1e1e1e',
    border: '#333',
    shadow: '#000',
  },
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemColorScheme = useColorScheme() ?? "light";
  const { mode, isDark } = useSettingsStore();
  
  // Determine the actual theme to use
  let theme: 'light' | 'dark' = 'light';
  if (mode === 'system') {
    theme = systemColorScheme;
  } else if (mode === 'dark') {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useTheme() {
  const systemColorScheme = useColorScheme() ?? "light";
  const { mode, isDark } = useSettingsStore();
  
  let theme: 'light' | 'dark' = 'light';
  if (mode === 'system') {
    theme = systemColorScheme;
  } else if (mode === 'dark') {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  return {
    theme,
    isDark: theme === 'dark',
    colors: Colors[theme],
    mode,
  };
}
