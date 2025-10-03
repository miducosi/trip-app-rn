import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/src/components/common';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { TabId } from '../../types/tour';

interface TourTabContentProps {
  activeTab: TabId;
  textColor: string;
}

export default function TourTabContent({ activeTab, textColor }: TourTabContentProps) {
  const { t } = useTranslation();

  const getTabContent = () => {
    switch (activeTab) {
      case 'accommodation':
        return t(translationKeys.tour.tabContent.accommodation);
      case 'bookingDetails':
        return t(translationKeys.tour.tabContent.booking);
      default:
        return null;
    }
  };

  const content = getTabContent();
  
  if (!content) {
    return null;
  }

  return (
    <View style={styles.tabContent}>
      <Text style={[styles.tabContentText, { color: textColor }]}> 
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  tabContentText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
