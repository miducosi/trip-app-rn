import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useOnboardingStore } from '../store/onboardingStore';
import { useTranslation } from 'react-i18next';
import { translationKeys, TranslationKey } from '@/src/locales/keys';
import { useTheme } from '../hooks/useThemeColor';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingPageConfig {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
  showPermissionButton?: boolean;
  permissionType?: 'notifications' | 'location';
}

const onboardingPagesConfig: OnboardingPageConfig[] = [
  {
    id: 'welcome',
    titleKey: translationKeys.onboarding.pages.welcome.title,
    subtitleKey: translationKeys.onboarding.pages.welcome.subtitle,
    descriptionKey: translationKeys.onboarding.pages.welcome.description,
    icon: 'airplane',
    backgroundColor: 'onboardingBlue',
    textColor: 'textWhite',
  },
  {
    id: 'explore',
    titleKey: translationKeys.onboarding.pages.explore.title,
    subtitleKey: translationKeys.onboarding.pages.explore.subtitle,
    descriptionKey: translationKeys.onboarding.pages.explore.description,
    icon: 'globe',
    backgroundColor: 'onboardingGreen',
    textColor: 'textWhite',
  },
  {
    id: 'notifications',
    titleKey: translationKeys.onboarding.pages.notifications.title,
    subtitleKey: translationKeys.onboarding.pages.notifications.subtitle,
    descriptionKey: translationKeys.onboarding.pages.notifications.description,
    icon: 'notifications',
    backgroundColor: 'onboardingRed',
    textColor: 'textWhite',
    showPermissionButton: true,
    permissionType: 'notifications',
  },
  {
    id: 'location',
    titleKey: translationKeys.onboarding.pages.location.title,
    subtitleKey: translationKeys.onboarding.pages.location.subtitle,
    descriptionKey: translationKeys.onboarding.pages.location.description,
    icon: 'location',
    backgroundColor: 'onboardingPurple',
    textColor: 'textWhite',
    showPermissionButton: true,
    permissionType: 'location',
  },
  {
    id: 'ready',
    titleKey: translationKeys.onboarding.pages.ready.title,
    subtitleKey: translationKeys.onboarding.pages.ready.subtitle,
    descriptionKey: translationKeys.onboarding.pages.ready.description,
    icon: 'checkmark-circle',
    backgroundColor: 'onboardingTeal',
    textColor: 'textWhite',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { 
    permissionsGranted, 
    setPermissionGranted, 
    setOnboardingCompleted,
    isCompleted 
  } = useOnboardingStore();
  const { t } = useTranslation();
  const { colors } = useTheme();

  useEffect(() => {
    // Check if onboarding is already completed
    if (isCompleted) {
      router.replace('/home');
    } else {
      setIsLoading(false);
    }
  }, [isCompleted]);

  const handleNext = () => {
    if (currentPage < onboardingPagesConfig.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Onboarding complete, mark as completed and navigate to home
      setOnboardingCompleted(true);
      router.replace('/home');
    }
  };

  const handleSkip = () => {
    setOnboardingCompleted(true);
    router.replace('/home');
  };

  const handlePermissionRequest = async (type: 'notifications' | 'location') => {
    try {
      if (type === 'notifications') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          setPermissionGranted('notifications', true);
          Alert.alert(
            t(translationKeys.common.success),
            t(translationKeys.onboarding.alerts.notificationsGranted)
          );
        } else {
          Alert.alert(
            t(translationKeys.common.error),
            t(translationKeys.onboarding.alerts.notificationsDenied)
          );
        }
      } else if (type === 'location') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setPermissionGranted('location', true);
          Alert.alert(
            t(translationKeys.common.success),
            t(translationKeys.onboarding.alerts.locationGranted)
          );
        } else {
          Alert.alert(
            t(translationKeys.common.error),
            t(translationKeys.onboarding.alerts.locationDenied)
          );
        }
      }
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert(
        t(translationKeys.common.error),
        t(translationKeys.onboarding.alerts.permissionError)
      );
    }
  };

  const currentPageConfig = onboardingPagesConfig[currentPage];
  const isLastPage = currentPage === onboardingPagesConfig.length - 1;
  const permissionType = currentPageConfig.permissionType;
  const isPermissionPage = Boolean(currentPageConfig.showPermissionButton && permissionType);
  const permissionGranted =
    isPermissionPage && permissionType ? permissionsGranted[permissionType] : false;

  const backgroundColor = colors[currentPageConfig.backgroundColor as keyof typeof colors] ?? colors.onboardingBlue;
  const textColor = colors[currentPageConfig.textColor as keyof typeof colors] ?? colors.textWhite;

  const dynamicStyles = StyleSheet.create({
    skipButton: {
      ...styles.skipButton,
      backgroundColor: colors.tourGlassOverlay,
    },
  });
  const title = t(currentPageConfig.titleKey, {
    appName: t(translationKeys.common.appName),
  });
  const subtitle = t(currentPageConfig.subtitleKey, {
    appName: t(translationKeys.common.appName),
  });
  const description = t(currentPageConfig.descriptionKey, {
    appName: t(translationKeys.common.appName),
  });

  const permissionButtonText = permissionType === 'notifications'
    ? t(translationKeys.onboarding.enableNotifications)
    : t(translationKeys.onboarding.enableLocation);

  const permissionEnabledText = permissionType === 'notifications'
    ? t(translationKeys.onboarding.notificationsEnabled)
    : t(translationKeys.onboarding.locationEnabled);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.onboardingBlue }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.textWhite} />
          <Text style={[styles.loadingText, { color: colors.textWhite }]}>
            {t(translationKeys.common.loading)}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Skip Button */}
      {!isLastPage && (
        <TouchableOpacity style={dynamicStyles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: textColor }]}>
            {t(translationKeys.onboarding.skip)}
          </Text>
        </TouchableOpacity>
      )}

      {/* Page Content */}
      <View style={styles.content}>
        {/* Icon/Image */}
        <View style={styles.iconContainer}>
          <Ionicons 
            name={currentPageConfig.icon} 
            size={120} 
            color={textColor} 
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: textColor }]}>
            {subtitle}
          </Text>
          <Text style={[styles.description, { color: textColor }]}>
            {description}
          </Text>
        </View>

        {/* Permission Button */}
        {isPermissionPage && !permissionGranted && (
          <TouchableOpacity
            style={[styles.permissionButton, { backgroundColor: textColor }]}
            onPress={() => {
              if (permissionType) {
                void handlePermissionRequest(permissionType);
              }
            }}
          >
            <Ionicons 
              name={permissionType === 'notifications' ? 'notifications' : 'location'} 
              size={24} 
              color={backgroundColor} 
            />
            <Text style={[styles.permissionButtonText, { color: backgroundColor }]}>
              {permissionButtonText}
            </Text>
          </TouchableOpacity>
        )}

        {/* Permission Granted Indicator */}
        {isPermissionPage && permissionGranted && (
          <View style={styles.permissionGrantedContainer}>
            <Ionicons name="checkmark-circle" size={32} color={textColor} />
            <Text style={[styles.permissionGrantedText, { color: textColor }]}>
              {permissionEnabledText}
            </Text>
          </View>
        )}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Page Indicators */}
        <View style={styles.pageIndicators}>
          {onboardingPagesConfig.map((_, index) => (
            <View
              key={index}
              style={[
                styles.pageIndicator,
                {
                  backgroundColor: index === currentPage 
                    ? textColor 
                    : `${textColor}80`,
                  opacity: index === currentPage ? 1 : 0.6,
                },
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          {currentPage > 0 && (
            <TouchableOpacity
              style={[styles.backButton, { borderColor: textColor }]}
              onPress={() => setCurrentPage(currentPage - 1)}
            >
              <Ionicons name="arrow-back" size={24} color={textColor} />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              { 
                backgroundColor: textColor,
                flex: currentPage === 0 ? 1 : 0.7,
              }
            ]}
            onPress={handleNext}
          >
            <Text style={[styles.nextButtonText, { color: backgroundColor }]}>
              {isLastPage ? t(translationKeys.onboarding.getStarted) : t(translationKeys.onboarding.next)}
            </Text>
            {!isLastPage && (
              <Ionicons 
                name="arrow-forward" 
                size={20} 
                color={backgroundColor} 
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 20,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  permissionGrantedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  permissionGrantedText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 16,
  },
});
