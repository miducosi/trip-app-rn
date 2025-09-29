import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from '../hooks/useThemeColor';
import FloatingTabBar, { FloatingTabId } from '../components/navigation/FloatingTabBar';
import HomeHeader from '../components/destination/HomeHeader';
import SearchBar from '../components/destination/SearchBar';
import CategoriesSection from '../components/destination/CategoriesSection';
import DestinationCard from '../components/destination/DestinationCard';
import { useRouter } from 'expo-router';
import { usePopularDestinations } from '../api/hooks/useCountries';
import { AppDestination } from '../api/types/Country';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';
import { fallbackDestinations } from '../data/mockDestinations';


type CategoryKey = keyof typeof translationKeys.home.categories;

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('southAmerica');
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
  const backgroundColor = colors.backgroundPrimary;

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

  const handleDestinationPress = (destinationId: string) => {
    router.push(`/destination-detail?id=${destinationId}`);
  };

  const handleSearchPress = () => {
    // TODO: Implement search functionality
    console.log('Search pressed');
  };

  const handleFilterPress = () => {
    // TODO: Implement filter functionality
    console.log('Filter pressed');
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
      <HomeHeader userName={userId || undefined} />

      {/* Search Bar */}
      <SearchBar 
        onSearchPress={handleSearchPress}
        onFilterPress={handleFilterPress}
      />

      {/* Categories */}
      <CategoriesSection 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Destinations */}
      <ScrollView 
        style={styles.destinationsContainer} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {destinations.map((destination: AppDestination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isFavorite={favorites.includes(destination.id)}
            onFavoritePress={toggleFavorite}
            onCardPress={() => handleDestinationPress(destination.id)}
          />
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
  destinationsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
}); 
