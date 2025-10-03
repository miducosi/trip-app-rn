/**
 * Font styling utilities
 * Provides consistent font family throughout the app
 */

import { TextStyle } from 'react-native';
import { customFontFamily } from '../hooks/useCustomFont';

/**
 * Get the default font family for the app
 */
export function getDefaultFontFamily(): string | undefined {
  return customFontFamily || undefined;
}

/**
 * Get text style with custom font applied
 */
export function getTextStyle(style?: TextStyle): TextStyle {
  const fontFamily = getDefaultFontFamily();
  
  return {
    ...style,
    ...(fontFamily ? { fontFamily } : {}),
  };
}

/**
 * Font family constant for direct use
 */
export const DEFAULT_FONT_FAMILY = 'BoldonseRegular';
