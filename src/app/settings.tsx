import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useTheme } from '@/src/hooks/useThemeColor';
import { useOnboardingStore } from '../store/onboardingStore';
import { useSettingsStore } from '../store/settingsStore';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsSections from '../components/settings/SettingsSections';
import SignOutButton from '../components/settings/SignOutButton';
import LanguageBottomSheet from '../components/settings/LanguageBottomSheet';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { changeAppLanguage, supportedLanguages, SupportedLanguage } from '@/src/utils/i18n';
import { useAuthStore } from '../store/authStore';

export default function SettingsScreen() {
  const [isLanguageBottomSheetVisible, setIsLanguageBottomSheetVisible] = useState(false);
  const { resetOnboarding } = useOnboardingStore();
  const { logout } = useAuthStore();
  const { language, setLanguage } = useSettingsStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  // Get auth state
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;
  
  const backgroundColor = colors.backgroundPrimary;

  const handleResetOnboarding = () => {
    Alert.alert(
      t(translationKeys.settings.alerts.resetOnboardingTitle),
      t(translationKeys.settings.alerts.resetOnboardingMessage),
      [
        { text: t(translationKeys.common.cancel), style: 'cancel' },
        {
          text: t(translationKeys.common.reset),
          style: 'destructive',
          onPress: () => {
            resetOnboarding();
            Alert.alert(
              t(translationKeys.common.success),
              t(translationKeys.settings.alerts.resetOnboardingSuccess)
            );
          },
        },
      ]
    );
  };

  const applyLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    void changeAppLanguage(code);
  };

  const handleLanguagePress = () => {
    setIsLanguageBottomSheetVisible(true);
  };

  const handleLanguageSelect = (selectedLanguage: SupportedLanguage) => {
    applyLanguage(selectedLanguage);
  };

  const handleCloseLanguageBottomSheet = () => {
    setIsLanguageBottomSheetVisible(false);
  };

  const handleSignOut = () => {
    Alert.alert(
      t(translationKeys.common.signOut),
      t(translationKeys.common.signOutConfirmation),
      [
        { text: t(translationKeys.common.cancel), style: 'cancel' },
        {
          text: t(translationKeys.common.signOut),
          style: 'destructive',
          onPress: () => {
            logout();
          }
        },
      ]
    );
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <SettingsHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Settings Sections */}
        <SettingsSections 
          isLoggedIn={isLoggedIn}
          onLanguagePress={handleLanguagePress}
          onResetOnboarding={handleResetOnboarding}
        />

        {/* Sign Out - Only show when logged in */}
        {isLoggedIn && (
          <SignOutButton onPress={handleSignOut} />
        )}
      </ScrollView>

      {/* Language Selection Bottom Sheet */}
      <LanguageBottomSheet
        visible={isLanguageBottomSheetVisible}
        onClose={handleCloseLanguageBottomSheet}
        onLanguageSelect={handleLanguageSelect}
        currentLanguage={language}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
