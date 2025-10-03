import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface DestinationInfoProps {
  onReadMorePress?: () => void;
}

export default function DestinationInfo({ onReadMorePress }: DestinationInfoProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;

  const dynamicStyles = StyleSheet.create({
    locationIcon: {
      ...styles.locationIcon,
      backgroundColor: colors.tourBackground,
    },
    locationText: {
      ...styles.locationText,
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
    readMoreText: {
      ...styles.readMoreText,
      color: colors.accent,
    },
  });

  return (
    <View style={styles.destinationInfo}>
      <Text style={[styles.destinationTitle, { color: textColor }]}>
        {t(translationKeys.destination.title)}
      </Text>
      
      <View style={styles.locationContainer}>
        <View style={dynamicStyles.locationIcon}>
          <Ionicons name="location" size={16} color={colors.primaryLight} />
        </View>
        <Text style={dynamicStyles.locationText}>
          {t(translationKeys.destination.country)}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.star} />
          <Text style={dynamicStyles.ratingText}>5.0</Text>
          <Text style={dynamicStyles.reviewsText}>
            {t(translationKeys.destination.reviews, { count: 143 })}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, { color: textColor }]}> 
        {t(translationKeys.destination.description)}
      </Text>
      
      <TouchableOpacity onPress={onReadMorePress}>
        <Text style={dynamicStyles.readMoreText}>
          {t(translationKeys.destination.readMore)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  destinationInfo: {
    padding: 20,
  },
  destinationTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  readMoreText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
