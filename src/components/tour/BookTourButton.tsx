import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BookTourButtonProps {
  onPress: () => void;
}

export default function BookTourButton({ onPress }: BookTourButtonProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bookButtonContainer, { paddingBottom: 20 + insets.bottom }]}>
      <TouchableOpacity style={styles.bookButton} onPress={onPress}>
        <Text style={styles.bookButtonText}>{t(translationKeys.tour.bookButton)}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  bookButton: {
    backgroundColor: '#333',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
