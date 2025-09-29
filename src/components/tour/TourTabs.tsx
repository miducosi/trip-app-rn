import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { TabId } from '../../types/tour';

interface TourTabsProps {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
  tabIds: TabId[];
}

export default function TourTabs({ activeTab, onTabPress, tabIds }: TourTabsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.tabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabIds.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
              { backgroundColor: activeTab === tab ? '#333' : '#f0f0f0' }
            ]}
            onPress={() => onTabPress(tab)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? '#fff' : '#666' }
            ]}>
              {t(translationKeys.tour.tabs[tab])}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTabButton: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
