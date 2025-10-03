import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { getDefaultFontFamily } from '@/src/utils/fontStyles';

/**
 * Custom Text component that applies the custom font family by default
 * Use this instead of the default Text component for consistent typography
 */
export function ThemedText({ style, ...props }: TextProps) {
  const fontFamily = getDefaultFontFamily();
  
  return (
    <RNText
      style={[
        fontFamily ? { fontFamily } : undefined,
        style
      ]}
      {...props}
    />
  );
}

/**
 * Text component with custom font applied
 * This is the recommended way to use text in the app
 */
export default ThemedText;


