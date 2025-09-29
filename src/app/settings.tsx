import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useThemeColor';
import { useOnboardingStore } from '../store/onboardingStore';
import { useSettingsStore } from '../store/settingsStore';
import SettingItem from '../components/SettingItem';
import LanguageBottomSheet from '../components/LanguageBottomSheet';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { changeAppLanguage, supportedLanguages, SupportedLanguage } from '@/src/utils/i18n';
import { useAuthStore } from '../store/authStore';

export default function SettingsScreen() {
  const [isLanguageBottomSheetVisible, setIsLanguageBottomSheetVisible] = useState(false);
  const router = useRouter();
  const { resetOnboarding } = useOnboardingStore();
  const { logout } = useAuthStore();
  const {
    isDark,
    notifications,
    locationServices,
    language,
    toggleTheme,
    setNotifications,
    setLocationServices,
    setLanguage,
  } = useSettingsStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  // Get auth state
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;
  
  const backgroundColor = colors.background;
  const textColor = colors.text;
  const cardBackground = colors.cardBackground;

  const currentLanguage = supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];
  const languageLabel = t(currentLanguage.labelKey);

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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          {t(translationKeys.settings.title)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
          <SettingItem
            icon="notifications-outline"
            title={t(translationKeys.settings.items.notifications.title)}
            subtitle={t(translationKeys.settings.items.notifications.subtitle)}
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notifications ? '#f5dd4b' : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            icon="moon-outline"
            title={t(translationKeys.settings.items.darkMode.title)}
            subtitle={t(translationKeys.settings.items.darkMode.subtitle)}
            rightComponent={
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
              />
            }
          />
          <SettingItem
            icon="location-outline"
            title={t(translationKeys.settings.items.locationServices.title)}
            subtitle={t(translationKeys.settings.items.locationServices.subtitle)}
            rightComponent={
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={locationServices ? '#f5dd4b' : '#f4f3f4'}
              />
            }
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
            onPress={handleLanguagePress}
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
            onPress={handleResetOnboarding}
          />
        </View>

        {/* Sign Out - Only show when logged in */}
        {isLoggedIn && (
          <View style={styles.section}>
            <TouchableOpacity 
              style={[styles.signOutButton, { backgroundColor: cardBackground }]}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={24} color="#ff4757" />
              <Text style={styles.signOutText}>{t(translationKeys.common.signOut)}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.05)',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 4,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff4757',
    marginLeft: 8,
  },
});
