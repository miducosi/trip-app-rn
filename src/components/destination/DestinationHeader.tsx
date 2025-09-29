import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/hooks/useThemeColor';

interface DestinationHeaderProps {
  isFavorite: boolean;
  onBackPress: () => void;
  onFavoritePress: () => void;
}

export default function DestinationHeader({ 
  isFavorite, 
  onBackPress, 
  onFavoritePress 
}: DestinationHeaderProps) {
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    backButton: {
      ...styles.backButton,
      backgroundColor: colors.tourOverlay,
    },
    favoriteButton: {
      ...styles.favoriteButton,
      backgroundColor: colors.tourOverlay,
    },
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity style={dynamicStyles.backButton} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={dynamicStyles.favoriteButton} onPress={onFavoritePress}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={isFavorite ? colors.favorite : colors.textPrimary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
