import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useThemeColor';
import FloatingTabBar, { FloatingTabId } from '../components/FloatingTabBar';
import { useRouter } from 'expo-router';
import { usePopularDestinations } from '../api/hooks/useCountries';
import { AppDestination } from '../api/types/Country';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';
import { fallbackDestinations } from '../data/mockDestinations';


const categories: Array<keyof typeof translationKeys.home.categories> = [
  'asia',
  'europe',
  'southAmerica',
  'northAmerica',
  'africa',
  'oceania',
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number]
  >('southAmerica');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<FloatingTabId>('home');
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  
  // Get auth state
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const isLoggedIn = !!token;
  
  // Fetch real data from OpenTripMap API
  const { data: popularDestinationsData, isLoading: isDataLoading, error } = usePopularDestinations();
  
  // Use the API data directly since it's already in the correct format
  const destinations = (popularDestinationsData as AppDestination[]) || fallbackDestinations;
  
  const { t } = useTranslation();
  const { colors } = useTheme();
  const backgroundColor = colors.background;
  const textColor = colors.text;
  const cardBackground = colors.cardBackground;
  const userName = userId ?? t(translationKeys.home.defaultUserName);

  const toggleFavorite = (destinationId: string) => {
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const handleTabPress = (tabId: FloatingTabId) => {
    setActiveTab(tabId);
    // TODO: Navigate to different screens based on tab
  };

  const handleSeeMore = () => {
    router.push('/destination-detail');
  };

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollThreshold = 15; // Increased threshold for smoother transitions
    
    // Only trigger if we've scrolled enough and direction has changed
    if (currentScrollY > lastScrollY + scrollThreshold) {
      // Scrolling down - hide tab bar
      setTabBarVisible(false);
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      // Scrolling up - show tab bar
      setTabBarVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <View>
            {isLoggedIn ? (
              <>
                <Text style={[styles.welcomeText, { color: textColor }]}>
                  {t(translationKeys.home.helloUser, { name: userName })}
                </Text>
                <Text style={[styles.subtitleText, { color: textColor }]}>
                  {t(translationKeys.home.welcomeTitle, {
                    appName: t(translationKeys.common.appName),
                  })}
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.welcomeText, { color: textColor }]}>
                  {t(translationKeys.home.welcomeTitle, {
                    appName: t(translationKeys.common.appName),
                  })}
                </Text>
                <Text style={[styles.subtitleText, { color: textColor }]}>
                  {t(translationKeys.home.loginPrompt)}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity 
            style={styles.profileRedirectButton}
            onPress={() => isLoggedIn ? router.push('/profile') : router.push('/login')}
          >
            <Ionicons name="open-outline" size={20} color={textColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <Ionicons name="settings-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: cardBackground }]}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>{t(translationKeys.common.search)}</Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: cardBackground }]}>
          <Ionicons name="filter" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.home.selectNextTrip)}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
                { backgroundColor: selectedCategory === category ? '#333' : cardBackground }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === category ? '#fff' : textColor }
              ]}>
                {t(translationKeys.home.categories[category])}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Destinations */}
      <ScrollView 
        style={styles.destinationsContainer} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
                  {destinations.map((destination: AppDestination, index: number) => (
          <View key={destination.id} style={[styles.destinationCard, { backgroundColor: cardBackground }]}>
            <Image source={{ uri: destination.image }} style={styles.destinationImage} />
            
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(destination.id)}
            >
              <Ionicons
                name={favorites.includes(destination.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={favorites.includes(destination.id) ? '#ff4757' : '#fff'}
              />
            </TouchableOpacity>

            <View style={styles.destinationContent}>
              <View style={styles.destinationInfo}>
                <Text style={styles.countryText}>{destination.country}</Text>
                <Text style={[styles.cityText, { color: textColor }]}>{destination.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#ffd700" />
                  <Text style={styles.ratingText}>{destination.rating}</Text>
                  <Text style={styles.reviewsText}>
                    {t(translationKeys.home.reviews, { count: destination.reviews })}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.arrowButton} onPress={handleSeeMore}>
                <Ionicons name="chevron-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Floating Tab Bar */}
      <FloatingTabBar activeTab={activeTab} onTabPress={handleTabPress} visible={tabBarVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  profileRedirectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.7,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  destinationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  destinationCard: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    color: '#666',
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
    color: '#666',
  },

  arrowButton: {
    width: 44,
    height: 44,
    backgroundColor: '#333',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
