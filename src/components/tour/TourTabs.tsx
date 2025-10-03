import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/src/components/common';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { TabId } from '../../types/tour';
import { useTheme } from '@/src/hooks/useThemeColor';

interface TourTabsProps {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
  tabIds: TabId[];
}

export default function TourTabs({ activeTab, onTabPress, tabIds }: TourTabsProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    activeTabButton: {
      ...styles.activeTabButton,
      backgroundColor: colors.buttonPrimary,
    },
  });

  return (
    <View style={styles.tabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabIds.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
              { backgroundColor: activeTab === tab ? colors.buttonPrimary : colors.backgroundOverlay }
            ]}
            onPress={() => onTabPress(tab)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? colors.buttonText : colors.textSecondary }
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
    // backgroundColor will be set dynamically
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
