import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

export default function WelcomeHeader() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;

  return (
    <View style={styles.welcomeHeader}>
      <Text style={[styles.title, { color: textColor }]}>
        {t(translationKeys.login.welcomeBack)}
      </Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        {t(translationKeys.login.subtitle)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
