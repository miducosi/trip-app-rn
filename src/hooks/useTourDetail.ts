import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TourDay, TabId } from '../types/tour';
import { tourDayConfigs } from '../data/tourData';

export function useTourDetail() {
  const [activeTab, setActiveTab] = useState<TabId>('schedule');
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedDays, setExpandedDays] = useState(['1']); // Day 1 starts expanded
  
  const { t, i18n } = useTranslation();

  const tourDays = useMemo(
    () =>
      tourDayConfigs.map((day) => ({
        id: day.id,
        image: day.image,
        label: t(day.labelKey),
        title: t(day.titleKey),
        schedule: day.schedule.map((item) => ({
          time: t(item.timeKey),
          activity: t(item.activityKey),
        })),
      })),
    [t, i18n.language]
  );

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDayExpansion = (dayId: string) => {
    setExpandedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleBookTour = () => {
    // TODO: Navigate to booking screen
    console.log('Book tour pressed');
  };

  return {
    activeTab,
    setActiveTab,
    isFavorite,
    tourDays,
    expandedDays,
    toggleFavorite,
    toggleDayExpansion,
    handleBookTour,
  };
}
