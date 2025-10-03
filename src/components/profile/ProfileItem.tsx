import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useThemeColor';

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
}

export default function ProfileItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showArrow = true 
}: ProfileItemProps) {
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    profileItem: {
      ...styles.profileItem,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    profileIconContainer: {
      ...styles.profileIconContainer,
      backgroundColor: colors.backgroundOverlay,
    },
    profileItemSubtitle: {
      ...styles.profileItemSubtitle,
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity 
      style={dynamicStyles.profileItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <View style={dynamicStyles.profileIconContainer}>
          <Ionicons name={icon} size={24} color={colors.textSecondary} />
        </View>
        <View style={styles.profileItemText}>
          <Text style={[styles.profileItemTitle, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={dynamicStyles.profileItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileItemText: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 14,
  },
});
