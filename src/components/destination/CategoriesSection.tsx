import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

type CategoryKey = keyof typeof translationKeys.home.categories;

interface CategoriesSectionProps {
  selectedCategory: CategoryKey;
  onCategorySelect: (category: CategoryKey) => void;
}

const categories: CategoryKey[] = [
  'asia',
  'europe',
  'southAmerica',
  'northAmerica',
  'africa',
  'oceania',
];

export default function CategoriesSection({ 
  selectedCategory, 
  onCategorySelect 
}: CategoriesSectionProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  return (
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
              { 
                backgroundColor: selectedCategory === category 
                  ? colors.buttonPrimary 
                  : cardBackground 
              }
            ]}
            onPress={() => onCategorySelect(category)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryText,
              { 
                color: selectedCategory === category 
                  ? colors.textWhite 
                  : textColor 
              }
            ]}>
              {t(translationKeys.home.categories[category])}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    // Dynamic color applied in component
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
