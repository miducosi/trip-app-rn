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
import ProfileItem from './ProfileItem';

interface ProfileSectionsProps {
  onSignOut: () => void;
}

export default function ProfileSections({ onSignOut }: ProfileSectionsProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
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
    <>
      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.profile.sections.personalInformation)}
        </Text>
        <ProfileItem
          icon="person-outline"
          title={t(translationKeys.profile.items.personalDetails.title)}
          subtitle={t(translationKeys.profile.items.personalDetails.subtitle)}
          onPress={() => console.log('Personal details pressed')}
        />
        <ProfileItem
          icon="location-outline"
          title={t(translationKeys.profile.items.addresses.title)}
          subtitle={t(translationKeys.profile.items.addresses.subtitle)}
          onPress={() => console.log('Addresses pressed')}
        />
        <ProfileItem
          icon="card-outline"
          title={t(translationKeys.profile.items.paymentMethods.title)}
          subtitle={t(translationKeys.profile.items.paymentMethods.subtitle)}
          onPress={() => console.log('Payment methods pressed')}
        />
      </View>

      {/* Travel Preferences Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.profile.sections.travelPreferences)}
        </Text>
        <ProfileItem
          icon="airplane-outline"
          title={t(translationKeys.profile.items.flightPreferences.title)}
          subtitle={t(translationKeys.profile.items.flightPreferences.subtitle)}
          onPress={() => console.log('Flight preferences pressed')}
        />
        <ProfileItem
          icon="bed-outline"
          title={t(translationKeys.profile.items.accommodation.title)}
          subtitle={t(translationKeys.profile.items.accommodation.subtitle)}
          onPress={() => console.log('Accommodation pressed')}
        />
        <ProfileItem
          icon="restaurant-outline"
          title={t(translationKeys.profile.items.diningPreferences.title)}
          subtitle={t(translationKeys.profile.items.diningPreferences.subtitle)}
          onPress={() => console.log('Dining preferences pressed')}
        />
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          {t(translationKeys.profile.sections.account)}
        </Text>
        <ProfileItem
          icon="notifications-outline"
          title={t(translationKeys.profile.items.notificationSettings.title)}
          subtitle={t(translationKeys.profile.items.notificationSettings.subtitle)}
          onPress={() => console.log('Notifications pressed')}
        />
        <ProfileItem
          icon="shield-checkmark-outline"
          title={t(translationKeys.profile.items.privacySecurity.title)}
          subtitle={t(translationKeys.profile.items.privacySecurity.subtitle)}
          onPress={() => console.log('Privacy pressed')}
        />
        <ProfileItem
          icon="help-circle-outline"
          title={t(translationKeys.profile.items.helpSupport.title)}
          subtitle={t(translationKeys.profile.items.helpSupport.subtitle)}
          onPress={() => console.log('Help pressed')}
        />
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={dynamicStyles.signOutButton}
          onPress={onSignOut}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.favorite} />
          <Text style={dynamicStyles.signOutText}>{t(translationKeys.common.signOut)}</Text>
        </TouchableOpacity>
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
