import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface ProfileHeaderProps {
  onEditPress?: () => void;
  onCameraPress?: () => void;
}

export default function ProfileHeader({ onEditPress, onCameraPress }: ProfileHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;

  const dynamicStyles = StyleSheet.create({
    backButton: {
      ...styles.backButton,
      backgroundColor: colors.backgroundOverlay,
    },
    editButton: {
      ...styles.editButton,
      backgroundColor: colors.backgroundOverlay,
    },
    profileHeader: {
      ...styles.profileHeader,
      backgroundColor: cardBackground,
      shadowColor: colors.shadow,
    },
    cameraButton: {
      ...styles.cameraButton,
      backgroundColor: colors.primary,
      borderColor: colors.textWhite,
    },
  });

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={dynamicStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          {t(translationKeys.profile.title)}
        </Text>
        <TouchableOpacity 
          style={dynamicStyles.editButton}
          onPress={onEditPress}
        >
          <Ionicons name="create-outline" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={dynamicStyles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={dynamicStyles.cameraButton} onPress={onCameraPress}>
            <Ionicons name="camera" size={16} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.profileName, { color: textColor }]}>Vanessa Rodriguez</Text>
        <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>vanessa.rodriguez@email.com</Text>
        <Text style={[styles.profileLocation, { color: colors.textSecondary }]}>📍 Lisbon, Portugal</Text>
      </View>
    </>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileLocation: {
    fontSize: 14,
  },
});
