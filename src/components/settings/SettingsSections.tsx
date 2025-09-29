import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';
import SettingItem from './SettingItem';
import SwitchSettingItem from './SwitchSettingItem';
import { useSettingsStore } from '@/src/store/settingsStore';
import { supportedLanguages } from '@/src/utils/i18n';

interface SettingsSectionsProps {
  isLoggedIn: boolean;
  onLanguagePress: () => void;
  onResetOnboarding: () => void;
}

export default function SettingsSections({ 
  isLoggedIn, 
  onLanguagePress, 
  onResetOnboarding 
}: SettingsSectionsProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  
  const {
    isDark,
    notifications,
    locationServices,
    language,
    toggleTheme,
    setNotifications,
    setLocationServices,
  } = useSettingsStore();

  const currentLanguage = supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];
  const languageLabel = t(currentLanguage.labelKey);

  return (
    <>
      {/* Account Section - Only show when logged in */}
      {isLoggedIn && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}> 
            {t(translationKeys.settings.sections.account)}
          </Text>
          <SettingItem
            icon="person-outline"
            title={t(translationKeys.settings.items.profile.title)}
            subtitle={t(translationKeys.settings.items.profile.subtitle)}
            onPress={() => router.push('/profile')}
          />
          <SettingItem
            icon="card-outline"
            title={t(translationKeys.settings.items.paymentMethods.title)}
            subtitle={t(translationKeys.settings.items.paymentMethods.subtitle)}
            onPress={() => console.log('Payment pressed')}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title={t(translationKeys.settings.items.privacySecurity.title)}
            subtitle={t(translationKeys.settings.items.privacySecurity.subtitle)}
            onPress={() => console.log('Privacy pressed')}
          />
        </View>
      )}

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.settings.sections.preferences)}
        </Text>
        <SwitchSettingItem
          icon="notifications-outline"
          title={t(translationKeys.settings.items.notifications.title)}
          subtitle={t(translationKeys.settings.items.notifications.subtitle)}
          value={notifications}
          onValueChange={setNotifications}
        />
        <SwitchSettingItem
          icon="moon-outline"
          title={t(translationKeys.settings.items.darkMode.title)}
          subtitle={t(translationKeys.settings.items.darkMode.subtitle)}
          value={isDark}
          onValueChange={toggleTheme}
        />
        <SwitchSettingItem
          icon="location-outline"
          title={t(translationKeys.settings.items.locationServices.title)}
          subtitle={t(translationKeys.settings.items.locationServices.subtitle)}
          value={locationServices}
          onValueChange={setLocationServices}
        />
      </View>

      {/* App Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.settings.sections.app)}
        </Text>
        <SettingItem
          icon="language-outline"
          title={t(translationKeys.settings.items.language.title)}
          subtitle={t(translationKeys.settings.items.language.subtitle, {
            language: languageLabel,
          })}
          onPress={onLanguagePress}
        />
        <SettingItem
          icon="help-circle-outline"
          title={t(translationKeys.settings.items.helpSupport.title)}
          subtitle={t(translationKeys.settings.items.helpSupport.subtitle)}
          onPress={() => console.log('Help pressed')}
        />
        <SettingItem
          icon="information-circle-outline"
          title={t(translationKeys.settings.items.about.title)}
          subtitle={t(translationKeys.settings.items.about.subtitle)}
          onPress={() => console.log('About pressed')}
        />
        <SettingItem
          icon="refresh-outline"
          title={t(translationKeys.settings.items.resetOnboarding.title)}
          subtitle={t(translationKeys.settings.items.resetOnboarding.subtitle)}
          onPress={onResetOnboarding}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 4,
  },
});
