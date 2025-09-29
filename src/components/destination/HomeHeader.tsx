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
import { useAuthStore } from '@/src/store/authStore';
import { useTheme } from '@/src/hooks/useThemeColor';

interface HomeHeaderProps {
  userName?: string;
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  
  // Get auth state
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const isLoggedIn = !!token;
  
  const displayName = userName ?? userId ?? t(translationKeys.home.defaultUserName);
  const textColor = colors.textPrimary;

  const dynamicStyles = StyleSheet.create({
    loginButton: {
      ...styles.loginButton,
      backgroundColor: colors.backgroundOverlay,
    },
    settingsButton: {
      ...styles.settingsButton,
      backgroundColor: colors.backgroundOverlay,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.greetingContainer}>
        {isLoggedIn ? (
          <>
            <Text style={[styles.welcomeText, { color: textColor }]}>
              {t(translationKeys.home.helloUser, { name: displayName })}
            </Text>
            <Text style={[styles.subtitleText, { color: textColor }]}>
              {t(translationKeys.home.welcomeTitle, {
                appName: t(translationKeys.common.appName),
              })}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.welcomeText, { color: textColor }]}>
              {t(translationKeys.home.welcomeTitle, {
                appName: t(translationKeys.common.appName),
              })}
            </Text>
            <View style={styles.subtitleRow}>
              <TouchableOpacity 
                style={dynamicStyles.loginButton}
                onPress={() => router.push('/login')}
              >
                <Ionicons name="open-outline" size={20} color={textColor} />
              </TouchableOpacity>
              <Text style={[styles.subtitleText, { color: textColor }]}>
                {t(translationKeys.home.loginPrompt)}
              </Text>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity 
        style={dynamicStyles.settingsButton}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="settings-outline" size={24} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loginButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.7,
  },
});
