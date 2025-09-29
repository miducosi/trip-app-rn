import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useTheme } from '../hooks/useThemeColor';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileSections from '../components/profile/ProfileSections';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const backgroundColor = colors.backgroundPrimary;

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

  const handleEditPress = () => {
    console.log('Edit profile pressed');
  };

  const handleCameraPress = () => {
    console.log('Camera pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Profile Header */}
      <ProfileHeader 
        onEditPress={handleEditPress}
        onCameraPress={handleCameraPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Stats */}
        <ProfileStats />

        {/* Profile Sections */}
        <ProfileSections onSignOut={handleSignOut} />
      </ScrollView>
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
