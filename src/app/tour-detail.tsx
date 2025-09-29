import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useTourDetail } from '../hooks/useTourDetail';
import { tabIds } from '../data/tourData';
import TourHeader from '../components/tour/TourHeader';
import TourTabs from '../components/tour/TourTabs';
import TourSchedule from '../components/tour/TourSchedule';
import TourTabContent from '../components/tour/TourTabContent';
import BookTourButton from '../components/tour/BookTourButton';

export default function TourDetailScreen() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  
  const {
    activeTab,
    setActiveTab,
    isFavorite,
    tourDays,
    expandedDays,
    toggleFavorite,
    toggleDayExpansion,
    handleBookTour,
  } = useTourDetail();

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      
      <TourHeader
        backgroundColor={backgroundColor}
        textColor={textColor}
        isFavorite={isFavorite}
        onBackPress={goBack}
        onFavoritePress={toggleFavorite}
      />

      <TourTabs
        activeTab={activeTab}
        onTabPress={setActiveTab}
        tabIds={tabIds}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'schedule' && (
          <TourSchedule
            tourDays={tourDays}
            expandedDays={expandedDays}
            textColor={textColor}
            onToggleDayExpansion={toggleDayExpansion}
          />
        )}

        {(activeTab === 'accommodation' || activeTab === 'bookingDetails') && (
          <TourTabContent
            activeTab={activeTab}
            textColor={textColor}
          />
        )}
      </ScrollView>

      <BookTourButton onPress={handleBookTour} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
}); 
