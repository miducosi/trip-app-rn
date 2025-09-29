import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';

interface TabItem {
  id: keyof typeof translationKeys.navigation.tabs;
  icon: keyof typeof Ionicons.glyphMap;
}

export type FloatingTabId = TabItem['id'];

interface FloatingTabBarProps {
  activeTab: FloatingTabId;
  onTabPress: (tabId: FloatingTabId) => void;
  visible: boolean;
}

const tabs: TabItem[] = [
  { id: 'home', icon: 'home' },
  { id: 'trips', icon: 'list' },
  { id: 'favorites', icon: 'heart-outline' },
  { id: 'more', icon: 'grid-outline' },
];

const { width } = Dimensions.get('window');

export default function FloatingTabBar({ activeTab, onTabPress, visible }: FloatingTabBarProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const backgroundColor = '#fff';
  const activeColor = '#333';
  const inactiveColor = '#666';

  useEffect(() => {
    const animations = [];
    
    if (visible) {
      // Show tab bar
      animations.push(
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ])
      );
    } else {
      // Hide tab bar
      animations.push(
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 120,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(opacity, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ])
      );
    }

    Animated.parallel(animations).start();
  }, [visible, translateY, opacity]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor,
          transform: [{ translateY }],
          opacity,
          bottom: 30 + insets.bottom,
        }
      ]}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabButton}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
          accessibilityLabel={t(translationKeys.navigation.tabs[tab.id])}
        >
          <View style={[
            styles.iconContainer,
            activeTab === tab.id && styles.activeIconContainer
          ]}>
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#fff' : inactiveColor}
            />
          </View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#333',
    borderRadius: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 
