import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

export default function LoginHeader() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;

  const dynamicStyles = StyleSheet.create({
    backButton: {
      ...styles.backButton,
      backgroundColor: colors.backgroundOverlay,
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={dynamicStyles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color={textColor} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: textColor }]}>
        {t(translationKeys.login.title)}
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  headerSpacer: {
    width: 40,
  },
});
