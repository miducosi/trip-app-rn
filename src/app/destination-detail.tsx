import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';
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

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
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

  const handleTourPress = () => {
    router.push('/tour-detail');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? '#ff4757' : '#000'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=400&fit=crop' }}
            style={styles.heroImage}
          />
        </View>

        {/* Destination Info */}
        <View style={styles.destinationInfo}>
          <Text style={[styles.destinationTitle, { color: textColor }]}>
            {t(translationKeys.destination.title)}
          </Text>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={16} color="#4CAF50" />
            </View>
            <Text style={styles.locationText}>
              {t(translationKeys.destination.country)}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#ffd700" />
              <Text style={styles.ratingText}>5.0</Text>
              <Text style={styles.reviewsText}>
                {t(translationKeys.destination.reviews, { count: 143 })}
              </Text>
            </View>
          </View>

          <Text style={[styles.description, { color: textColor }]}> 
            {t(translationKeys.destination.description)}
          </Text>
          
          <TouchableOpacity>
            <Text style={styles.readMoreText}>
              {t(translationKeys.destination.readMore)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Tours Section */}
        <View style={styles.toursSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t(translationKeys.destination.upcomingTours)}
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>{t(translationKeys.destination.seeAll)}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toursScrollContainer}
          >
            {tours.map((tour) => (
              <View key={tour.id} style={styles.tourCard}>
                <View style={styles.tourImageContainer}>
                  <Image source={{ uri: tour.image }} style={styles.tourImage} />
                  <TouchableOpacity style={styles.tourFavoriteButton}>
                    <Ionicons name="heart-outline" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.tourInfo}>
                  <Text style={[styles.tourTitle, { color: textColor }]}>{tour.title}</Text>
                  <Text style={styles.tourDuration}>{tour.duration}</Text>
                  <Text style={styles.tourPrice}>{tour.price}</Text>
                  
                  <View style={styles.tourFooter}>
                    <View style={styles.tourRating}>
                      <Ionicons name="star" size={14} color="#ffd700" />
                      <Text style={styles.tourRatingText}>{tour.rating}</Text>
                      <Text style={styles.tourReviewsText}>
                        {t(translationKeys.destination.reviews, { count: tour.reviews })}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.tourArrowButton} onPress={handleTourPress}>
                      <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
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
    color: '#666',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  readMoreText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
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
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  toursScrollContainer: {
    paddingRight: 20,
  },
  tourCard: {
    width: width * 0.75,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    color: '#666',
    marginBottom: 2,
  },
  tourPrice: {
    fontSize: 14,
    color: '#666',
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
    color: '#666',
  },
  tourArrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
