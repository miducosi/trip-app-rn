import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../hooks/useThemeColor';
import DestinationHeader from '../components/destination/DestinationHeader';
import DestinationInfo from '../components/destination/DestinationInfo';
import ToursSection from '../components/destination/ToursSection';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';

interface Tour {
  id: string;
  title: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

const tourImages = {
  iconicBrazil: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=250&fit=crop',
  beachParadise: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
  mountainAdventure: 'https://images.unsplash.com/photo-1464822759844-d150baec0134?w=400&h=250&fit=crop',
} as const;

// Removed Dimensions import as it's no longer needed

export default function DestinationDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  
  const { colors } = useTheme();
  const backgroundColor = colors.backgroundPrimary;
  const textColor = colors.textPrimary;
  const { t, i18n } = useTranslation();
  const tours: Tour[] = useMemo(
    () => [
      {
        id: '1',
        title: t(translationKeys.destination.tours.iconicBrazil.title),
        duration: t(translationKeys.destination.tours.iconicBrazil.duration),
        price: t(translationKeys.destination.tours.iconicBrazil.price),
        rating: 4.6,
        reviews: 56,
        image: tourImages.iconicBrazil,
      },
      {
        id: '2',
        title: t(translationKeys.destination.tours.beachParadise.title),
        duration: t(translationKeys.destination.tours.beachParadise.duration),
        price: t(translationKeys.destination.tours.beachParadise.price),
        rating: 4.8,
        reviews: 42,
        image: tourImages.beachParadise,
      },
      {
        id: '3',
        title: t(translationKeys.destination.tours.mountainAdventure.title),
        duration: t(translationKeys.destination.tours.mountainAdventure.duration),
        price: t(translationKeys.destination.tours.mountainAdventure.price),
        rating: 4.7,
        reviews: 38,
        image: tourImages.mountainAdventure,
      },
    ],
    [t, i18n.language]
  );

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const goBack = () => {
    router.back();
  };

  const handleTourPress = (tourId: string) => {
    router.push(`/tour-detail?id=${tourId}`);
  };

  const handleReadMorePress = () => {
    // TODO: Implement read more functionality
    console.log('Read more pressed');
  };

  const handleSeeAllPress = () => {
    // TODO: Implement see all tours functionality
    console.log('See all tours pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <DestinationHeader 
        isFavorite={isFavorite}
        onBackPress={goBack}
        onFavoritePress={toggleFavorite}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=400&fit=crop' }}
            style={styles.heroImage}
          />
        </View>

        {/* Destination Info */}
        <DestinationInfo onReadMorePress={handleReadMorePress} />

        {/* Upcoming Tours Section */}
        <ToursSection 
          tours={tours}
          onTourPress={handleTourPress}
          onSeeAllPress={handleSeeAllPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 300,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
}); 
