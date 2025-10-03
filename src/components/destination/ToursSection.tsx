import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';
import TourCard from './TourCard';

interface Tour {
  id: string;
  title: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

interface ToursSectionProps {
  tours: Tour[];
  onTourPress: (tourId: string) => void;
  onSeeAllPress?: () => void;
}

export default function ToursSection({ 
  tours, 
  onTourPress, 
  onSeeAllPress 
}: ToursSectionProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;

  const dynamicStyles = StyleSheet.create({
    seeAllText: {
      ...styles.seeAllText,
      color: colors.accent,
    },
  });

  return (
    <View style={styles.toursSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.destination.upcomingTours)}
        </Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={dynamicStyles.seeAllText}>{t(translationKeys.destination.seeAll)}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.toursScrollContainer}
      >
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onTourPress={() => onTourPress(tour.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  toursSection: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for floating tab bar
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  toursScrollContainer: {
    paddingRight: 20,
  },
});
