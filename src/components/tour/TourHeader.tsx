import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';

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

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.headerCenter}>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          {t(translationKeys.tour.headerTitle)}
        </Text>
        <Text style={styles.headerSubtitle}>
          {t(translationKeys.tour.headerSubtitle)}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={isFavorite ? '#ff4757' : '#000'} 
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
    backgroundColor: '#f0f0f0',
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
    color: '#666',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
