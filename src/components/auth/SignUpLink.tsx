import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface SignUpLinkProps {
  onSignUpPress: () => void;
}

export default function SignUpLink({ onSignUpPress }: SignUpLinkProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;

  const dynamicStyles = StyleSheet.create({
    signUpLink: {
      ...styles.signUpLink,
      color: colors.accent,
    },
  });

  return (
    <View style={styles.signUpContainer}>
      <Text style={[styles.signUpText, { color: textColor }]}>
        {t(translationKeys.login.noAccount)}{' '}
      </Text>
      <TouchableOpacity onPress={onSignUpPress}>
        <Text style={dynamicStyles.signUpLink}>
          {t(translationKeys.login.signUp)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
