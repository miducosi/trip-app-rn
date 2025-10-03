import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useThemeColor';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
}

export default function SettingItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  rightComponent 
}: SettingItemProps) {
  const { colors } = useTheme();
  const textColor = colors.text;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    settingItem: {
      ...styles.settingItem,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    iconContainer: {
      ...styles.iconContainer,
      backgroundColor: colors.backgroundOverlay,
    },
    settingSubtitle: {
      ...styles.settingSubtitle,
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity 
      style={dynamicStyles.settingItem}
      onPress={onPress}
      disabled={!onPress || !!rightComponent}
    >
      <View style={styles.settingLeft}>
        <View style={dynamicStyles.iconContainer}>
          <Ionicons name={icon} size={24} color={colors.textSecondary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={dynamicStyles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent || (
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingItem: {
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
});

