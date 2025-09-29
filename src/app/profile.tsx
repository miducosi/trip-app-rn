import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const backgroundColor = colors.background;
  const textColor = colors.text;
  const cardBackground = colors.cardBackground;

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

  const ProfileItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.profileItem, { backgroundColor: cardBackground }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileItemLeft}>
        <View style={styles.profileIconContainer}>
          <Ionicons name={icon} size={24} color="#666" />
        </View>
        <View style={styles.profileItemText}>
          <Text style={[styles.profileItemTitle, { color: textColor }]}>{title}</Text>
          {subtitle && (
            <Text style={styles.profileItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  const StatCard = ({ 
    title, 
    value, 
    icon 
  }: {
    title: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <View style={[styles.statCard, { backgroundColor: cardBackground }]}>
      <Ionicons name={icon} size={24} color="#1E90FF" />
      <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

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
          {t(translationKeys.profile.title)}
        </Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => console.log('Edit profile')}
        >
          <Ionicons name="create-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: cardBackground }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.profileName, { color: textColor }]}>Vanessa Rodriguez</Text>
          <Text style={styles.profileEmail}>vanessa.rodriguez@email.com</Text>
          <Text style={styles.profileLocation}>📍 Lisbon, Portugal</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard title={t(translationKeys.profile.stats.trips)} value="12" icon="airplane" />
          <StatCard title={t(translationKeys.profile.stats.countries)} value="8" icon="globe" />
          <StatCard title={t(translationKeys.profile.stats.reviews)} value="24" icon="star" />
        </View>

        {/* Profile Sections */}
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
            style={[styles.signOutButton, { backgroundColor: cardBackground }]}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="#ff4757" />
            <Text style={styles.signOutText}>{t(translationKeys.common.signOut)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
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
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileItemText: {
    flex: 1,
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 14,
    color: '#666',
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
