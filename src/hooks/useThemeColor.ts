/**
 * Centralized color management for the React Native trip app.
 * 
 * This file provides a comprehensive color palette that supports both light and dark themes.
 * All colors used throughout the app should be referenced through these functions to ensure
 * consistency and proper theme switching.
 * 
 * Usage examples:
 * 
 * 1. Using useThemeColor for specific color properties:
 *    const backgroundColor = useThemeColor({ light: '#fff', dark: '#121212' }, 'background');
 * 
 * 2. Using useTheme to get the full theme object:
 *    const { colors, isDark } = useTheme();
 *    const textColor = colors.textPrimary;
 * 
 * 3. Using useColor for direct color access:
 *    const primaryColor = useColor('primary');
 * 
 * 4. Using useColorPalette for organized color groups:
 *    const { textColors, backgroundColors, statusColors } = useColorPalette();
 *    const errorColor = statusColors.error;
 * 
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';

const Colors = {
  light: {
    // Core theme colors
    text: '#000',
    background: '#fff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
    cardBackground: '#fff',
    border: '#e0e0e0',
    shadow: '#000',
    
    // Text colors
    textPrimary: '#000',
    textSecondary: '#666',
    textTertiary: '#ccc',
    textWhite: '#fff',
    
    // Background colors
    backgroundPrimary: '#fff',
    backgroundSecondary: '#f0f0f0',
    backgroundTertiary: '#f5f5f5',
    backgroundOverlay: 'rgba(0,0,0,0.05)',
    backgroundOverlayDark: 'rgba(0,0,0,0.3)',
    
    // Interactive colors
    primary: '#1E90FF',
    primaryLight: '#4CAF50',
    secondary: '#333',
    accent: '#007AFF',
    
    // Status colors
    success: '#32CD32',
    warning: '#ffd700',
    error: '#ff4757',
    info: '#1E90FF',
    
    // Social login colors
    google: '#DB4437',
    apple: '#000',
    
    // UI component colors
    buttonPrimary: '#333',
    buttonSecondary: '#f0f0f0',
    buttonText: '#fff',
    
    // Switch colors
    switchTrackFalse: '#767577',
    switchTrackTrue: '#81b0ff',
    switchThumb: '#f5dd4b',
    switchThumbInactive: '#f4f3f4',
    
    // Border and divider colors
    borderLight: '#f0f0f0',
    borderMedium: '#d1d1d1',
    divider: '#f0f0f0',
    
    // Rating and favorite colors
    star: '#ffd700',
    favorite: '#ff4757',
    
    // Onboarding page colors
    onboardingBlue: '#1E90FF',
    onboardingGreen: '#32CD32',
    onboardingRed: '#FF6B6B',
    onboardingPurple: '#9B59B6',
    onboardingTeal: '#2ECC71',
    
    // Tour specific colors
    tourBackground: '#E8F5E8',
    tourOverlay: 'rgba(255, 255, 255, 0.9)',
    tourButtonOverlay: 'rgba(255, 255, 255, 0.95)',
    tourGlassOverlay: 'rgba(255,255,255,0.2)',
  },
  dark: {
    // Core theme colors
    text: '#fff',
    background: '#121212',
    tint: '#fff',
    tabIconDefault: '#666',
    tabIconSelected: '#fff',
    cardBackground: '#1e1e1e',
    border: '#333',
    shadow: '#000',
    
    // Text colors
    textPrimary: '#fff',
    textSecondary: '#ccc',
    textTertiary: '#666',
    textWhite: '#fff',
    
    // Background colors
    backgroundPrimary: '#121212',
    backgroundSecondary: '#1e1e1e',
    backgroundTertiary: '#2e2e2e',
    backgroundOverlay: 'rgba(255,255,255,0.05)',
    backgroundOverlayDark: 'rgba(255,255,255,0.3)',
    
    // Interactive colors
    primary: '#4A90E2',
    primaryLight: '#66BB6A',
    secondary: '#fff',
    accent: '#007AFF',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#f44336',
    info: '#2196F3',
    
    // Social login colors
    google: '#DB4437',
    apple: '#fff',
    
    // UI component colors
    buttonPrimary: '#fff',
    buttonSecondary: '#333',
    buttonText: '#000',
    
    // Switch colors
    switchTrackFalse: '#767577',
    switchTrackTrue: '#81b0ff',
    switchThumb: '#f5dd4b',
    switchThumbInactive: '#f4f3f4',
    
    // Border and divider colors
    borderLight: '#333',
    borderMedium: '#555',
    divider: '#333',
    
    // Rating and favorite colors
    star: '#ffd700',
    favorite: '#ff4757',
    
    // Onboarding page colors
    onboardingBlue: '#1E90FF',
    onboardingGreen: '#32CD32',
    onboardingRed: '#FF6B6B',
    onboardingPurple: '#9B59B6',
    onboardingTeal: '#2ECC71',
    
    // Tour specific colors
    tourBackground: '#2E4A3E',
    tourOverlay: 'rgba(0, 0, 0, 0.9)',
    tourButtonOverlay: 'rgba(0, 0, 0, 0.95)',
    tourGlassOverlay: 'rgba(0,0,0,0.2)',
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

// Helper function to get a color directly without props
export function useColor(colorName: keyof typeof Colors.light) {
  const { colors } = useTheme();
  return colors[colorName];
}

// Helper function for common color combinations
export function useColorPalette() {
  const { colors, isDark } = useTheme();
  
  return {
    colors,
    isDark,
    // Common color combinations
    textColors: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      tertiary: colors.textTertiary,
      white: colors.textWhite,
    },
    backgroundColors: {
      primary: colors.backgroundPrimary,
      secondary: colors.backgroundSecondary,
      tertiary: colors.backgroundTertiary,
      overlay: colors.backgroundOverlay,
      overlayDark: colors.backgroundOverlayDark,
    },
    interactiveColors: {
      primary: colors.primary,
      primaryLight: colors.primaryLight,
      secondary: colors.secondary,
      accent: colors.accent,
    },
    statusColors: {
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
    },
    socialColors: {
      google: colors.google,
      apple: colors.apple,
    },
  };
}
