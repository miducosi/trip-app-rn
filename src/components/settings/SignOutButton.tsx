import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface SignOutButtonProps {
  onPress: () => void;
}

export default function SignOutButton({ onPress }: SignOutButtonProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    signOutButton: {
      ...styles.signOutButton,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    signOutText: {
      ...styles.signOutText,
      color: colors.favorite,
    },
  });

  return (
    <View style={styles.section}>
      <TouchableOpacity 
        style={dynamicStyles.signOutButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={24} color={colors.favorite} />
        <Text style={dynamicStyles.signOutText}>{t(translationKeys.common.signOut)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
