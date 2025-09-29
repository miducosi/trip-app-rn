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

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function SocialLogin({ onGoogleLogin, onAppleLogin }: SocialLoginProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    socialButton: {
      ...styles.socialButton,
      backgroundColor: cardBackground,
      borderColor: colors.border,
    },
    socialButtonText: {
      ...styles.socialButtonText,
      color: textColor,
    },
  });

  return (
    <View style={styles.socialButtons}>
      <TouchableOpacity 
        style={dynamicStyles.socialButton}
        onPress={onGoogleLogin}
        activeOpacity={0.7}
      >
        <Ionicons name="logo-google" size={24} color={colors.google} />
        <Text style={dynamicStyles.socialButtonText}>
          {t(translationKeys.login.socialGoogle)}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={dynamicStyles.socialButton}
        onPress={onAppleLogin}
        activeOpacity={0.7}
      >
        <Ionicons name="logo-apple" size={24} color={colors.apple} />
        <Text style={dynamicStyles.socialButtonText}>
          {t(translationKeys.login.socialApple)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 1,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
