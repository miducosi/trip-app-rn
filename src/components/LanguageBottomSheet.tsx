import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys, SupportedLanguage } from '@/src/locales/keys';
import { supportedLanguages } from '@/src/utils/i18n';
import { useTheme } from '../hooks/useThemeColor';

interface LanguageBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onLanguageSelect: (language: SupportedLanguage) => void;
  currentLanguage: SupportedLanguage;
}

const { height: screenHeight } = Dimensions.get('window');

export default function LanguageBottomSheet({
  visible,
  onClose,
  onLanguageSelect,
  currentLanguage,
}: LanguageBottomSheetProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const backgroundColor = colors.background;
  const textColor = colors.text;
  const cardBackground = colors.cardBackground;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.overlayContent}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={[styles.bottomSheet, { backgroundColor: cardBackground }]}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.handle} />
                <Text style={[styles.title, { color: textColor }]}>
                  {t(translationKeys.common.language)}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color={textColor} />
                </TouchableOpacity>
              </View>

              {/* Language Options */}
              <View style={styles.languageList}>
                {supportedLanguages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.languageOption,
                      currentLanguage === language.code && styles.selectedLanguageOption,
                      { 
                        backgroundColor: currentLanguage === language.code 
                          ? (colors.isDark ? '#333' : '#f0f0f0') 
                          : 'transparent' 
                      }
                    ]}
                    onPress={() => {
                      onLanguageSelect(language.code);
                      onClose();
                    }}
                  >
                    <View style={styles.languageInfo}>
                      <Text style={styles.flag}>{language.flag}</Text>
                      <Text style={[styles.languageName, { color: textColor }]}>
                        {t(language.labelKey)}
                      </Text>
                    </View>
                    
                    {currentLanguage === language.code && (
                      <Ionicons name="checkmark" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayContent: {
    maxHeight: screenHeight * 0.7,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area for home indicator
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#d1d1d1',
    borderRadius: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 16,
    padding: 4,
  },
  languageList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  selectedLanguageOption: {
    // Background color is handled dynamically based on theme
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
