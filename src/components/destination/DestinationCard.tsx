import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { AppDestination } from '../api/types/Country';
import { useTheme } from '@/src/hooks/useThemeColor';

interface DestinationCardProps {
  destination: AppDestination;
  isFavorite: boolean;
  onFavoritePress: (destinationId: string) => void;
  onCardPress: () => void;
}

export default function DestinationCard({ 
  destination, 
  isFavorite, 
  onFavoritePress, 
  onCardPress 
}: DestinationCardProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    destinationCard: {
      ...styles.destinationCard,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    favoriteButton: {
      ...styles.favoriteButton,
      backgroundColor: colors.backgroundOverlayDark,
    },
    countryText: {
      ...styles.countryText,
      color: colors.textSecondary,
    },
    ratingText: {
      ...styles.ratingText,
      color: colors.textPrimary,
    },
    reviewsText: {
      ...styles.reviewsText,
      color: colors.textSecondary,
    },
    arrowButton: {
      ...styles.arrowButton,
      backgroundColor: colors.buttonPrimary,
    },
  });

  return (
    <TouchableOpacity 
      style={dynamicStyles.destinationCard}
      onPress={onCardPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: destination.image }} style={styles.destinationImage} />
      
      <TouchableOpacity
        style={dynamicStyles.favoriteButton}
        onPress={() => onFavoritePress(destination.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? colors.favorite : colors.textWhite}
        />
      </TouchableOpacity>

      <View style={styles.destinationContent}>
        <View style={styles.destinationInfo}>
          <Text style={dynamicStyles.countryText}>{destination.country}</Text>
          <Text style={[styles.cityText, { color: textColor }]}>{destination.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.star} />
            <Text style={dynamicStyles.ratingText}>{destination.rating}</Text>
            <Text style={dynamicStyles.reviewsText}>
              {t(translationKeys.home.reviews, { count: destination.reviews })}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={dynamicStyles.arrowButton} activeOpacity={0.7}>
          <Ionicons name="chevron-forward" size={20} color={colors.textWhite} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  destinationCard: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  destinationInfo: {
    flex: 1,
  },
  countryText: {
    fontSize: 14,
    marginBottom: 4,
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
  },
  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
