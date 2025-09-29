import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '@/src/hooks/useThemeColor';
import SettingItem from './SettingItem';

interface SwitchSettingItemProps {
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function SwitchSettingItem({ 
  icon, 
  title, 
  subtitle, 
  value, 
  onValueChange 
}: SwitchSettingItemProps) {
  const { colors } = useTheme();

  const switchProps = {
    value,
    onValueChange,
    trackColor: { false: colors.switchTrackFalse, true: colors.switchTrackTrue },
    thumbColor: value ? colors.switchThumb : colors.switchThumbInactive,
  };

  return (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightComponent={<Switch {...switchProps} />}
    />
  );
}
