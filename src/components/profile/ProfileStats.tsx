import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    statCard: {
      ...styles.statCard,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    statTitle: {
      ...styles.statTitle,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={dynamicStyles.statCard}>
      <Ionicons name={icon} size={24} color={colors.primary} />
      <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
      <Text style={dynamicStyles.statTitle}>{title}</Text>
    </View>
  );
};

export default function ProfileStats() {
  const { t } = useTranslation();

  return (
    <View style={styles.statsContainer}>
      <StatCard title={t(translationKeys.profile.stats.trips)} value="12" icon="airplane" />
      <StatCard title={t(translationKeys.profile.stats.countries)} value="8" icon="globe" />
      <StatCard title={t(translationKeys.profile.stats.reviews)} value="24" icon="star" />
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
});
