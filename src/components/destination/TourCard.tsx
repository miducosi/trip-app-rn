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
import { useTheme } from '@/src/hooks/useThemeColor';

interface Tour {
  id: string;
  title: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

interface TourCardProps {
  tour: Tour;
  onTourPress: () => void;
  onFavoritePress?: () => void;
}

export default function TourCard({ tour, onTourPress, onFavoritePress }: TourCardProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    tourCard: {
      ...styles.tourCard,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    tourFavoriteButton: {
      ...styles.tourFavoriteButton,
      backgroundColor: colors.tourOverlay,
    },
    tourDuration: {
      ...styles.tourDuration,
      color: colors.textSecondary,
    },
    tourPrice: {
      ...styles.tourPrice,
      color: colors.textSecondary,
    },
    tourRatingText: {
      ...styles.tourRatingText,
      color: colors.textPrimary,
    },
    tourReviewsText: {
      ...styles.tourReviewsText,
      color: colors.textSecondary,
    },
    tourArrowButton: {
      ...styles.tourArrowButton,
      backgroundColor: colors.buttonPrimary,
    },
  });

  return (
    <View style={dynamicStyles.tourCard}>
      <View style={styles.tourImageContainer}>
        <Image source={{ uri: tour.image }} style={styles.tourImage} />
        {onFavoritePress && (
          <TouchableOpacity style={dynamicStyles.tourFavoriteButton} onPress={onFavoritePress}>
            <Ionicons name="heart-outline" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.tourInfo}>
        <Text style={[styles.tourTitle, { color: textColor }]}>{tour.title}</Text>
        <Text style={dynamicStyles.tourDuration}>{tour.duration}</Text>
        <Text style={dynamicStyles.tourPrice}>{tour.price}</Text>
        
        <View style={styles.tourFooter}>
          <View style={styles.tourRating}>
            <Ionicons name="star" size={14} color={colors.star} />
            <Text style={dynamicStyles.tourRatingText}>{tour.rating}</Text>
            <Text style={dynamicStyles.tourReviewsText}>
              {t(translationKeys.destination.reviews, { count: tour.reviews })}
            </Text>
          </View>
          <TouchableOpacity style={dynamicStyles.tourArrowButton} onPress={onTourPress}>
            <Ionicons name="chevron-forward" size={20} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tourCard: {
    width: 280, // Fixed width instead of using Dimensions
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tourImageContainer: {
    position: 'relative',
  },
  tourImage: {
    width: '100%',
    height: 150,
  },
  tourFavoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tourInfo: {
    padding: 16,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tourDuration: {
    fontSize: 14,
    marginBottom: 2,
  },
  tourPrice: {
    fontSize: 14,
    marginBottom: 12,
  },
  tourFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tourRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tourRatingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  tourReviewsText: {
    fontSize: 12,
  },
  tourArrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
