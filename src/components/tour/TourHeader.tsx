import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/src/components/common';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface TourHeaderProps {
  backgroundColor: string;
  textColor: string;
  isFavorite: boolean;
  onBackPress: () => void;
  onFavoritePress: () => void;
}

export default function TourHeader({
  backgroundColor,
  textColor,
  isFavorite,
  onBackPress,
  onFavoritePress,
}: TourHeaderProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    backButton: {
      ...styles.backButton,
      backgroundColor: colors.backgroundOverlay,
    },
    headerSubtitle: {
      ...styles.headerSubtitle,
      color: colors.textSecondary,
    },
    favoriteButton: {
      ...styles.favoriteButton,
      backgroundColor: colors.backgroundOverlay,
    },
  });

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <TouchableOpacity style={dynamicStyles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      
      <View style={styles.headerCenter}>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          {t(translationKeys.tour.headerTitle)}
        </Text>
        <Text style={dynamicStyles.headerSubtitle}>
          {t(translationKeys.tour.headerSubtitle)}
        </Text>
      </View>
      
      <TouchableOpacity style={dynamicStyles.favoriteButton} onPress={onFavoritePress}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={isFavorite ? colors.favorite : colors.textPrimary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
