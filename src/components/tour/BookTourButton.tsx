import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/hooks/useThemeColor';

interface BookTourButtonProps {
  onPress: () => void;
}

export default function BookTourButton({ onPress }: BookTourButtonProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const dynamicStyles = StyleSheet.create({
    bookButtonContainer: {
      ...styles.bookButtonContainer,
      backgroundColor: colors.tourButtonOverlay,
    },
    bookButton: {
      ...styles.bookButton,
      backgroundColor: colors.buttonPrimary,
    },
    bookButtonText: {
      ...styles.bookButtonText,
      color: colors.buttonText,
    },
  });

  return (
    <View style={[dynamicStyles.bookButtonContainer, { paddingBottom: 20 + insets.bottom }]}>
      <TouchableOpacity style={dynamicStyles.bookButton} onPress={onPress}>
        <Text style={dynamicStyles.bookButtonText}>{t(translationKeys.tour.bookButton)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
