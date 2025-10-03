import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface SearchBarProps {
  onSearchPress?: () => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ onSearchPress, onFilterPress }: SearchBarProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    searchBar: {
      ...styles.searchBar,
      backgroundColor: cardBackground,
    },
    filterButton: {
      ...styles.filterButton,
      backgroundColor: cardBackground,
    },
    searchText: {
      ...styles.searchText,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity 
        style={dynamicStyles.searchBar}
        onPress={onSearchPress}
        activeOpacity={0.7}
      >
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <Text style={dynamicStyles.searchText}>{t(translationKeys.common.search)}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={dynamicStyles.filterButton}
        onPress={onFilterPress}
        activeOpacity={0.7}
      >
        <Ionicons name="filter" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
