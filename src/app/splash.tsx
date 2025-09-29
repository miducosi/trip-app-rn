import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '../store/onboardingStore';
import { useTheme } from '../hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';

export default function SplashScreen() {
  const router = useRouter();
  const { isCompleted } = useOnboardingStore();
  const { colors } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const checkOnboardingAndNavigate = async () => {
      // Wait a bit for the store to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the current state from the store
      const currentState = useOnboardingStore.getState();
      console.log('isCompleted', currentState.isCompleted);
      
      if (currentState.isCompleted) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    };

    checkOnboardingAndNavigate();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: colors.tint }]}>
            {t(translationKeys.common.appName)}
          </Text>
          <Text style={[styles.tagline, { color: colors.text }]}>
            {t(translationKeys.common.tagline)}
          </Text>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            {t(translationKeys.common.loading)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
});
