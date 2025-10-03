import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/src/components';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useTheme } from '@/src/hooks/useThemeColor';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export default function LoginForm({ onLogin, onForgotPassword, isLoading = false }: LoginFormProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const textColor = colors.textPrimary;
  const cardBackground = colors.cardBackground;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    onLogin(email, password);
  };

  const dynamicStyles = StyleSheet.create({
    inputWrapper: {
      ...styles.inputWrapper,
      backgroundColor: cardBackground,
      borderColor: colors.border,
    },
    loginButton: {
      ...styles.loginButton,
      backgroundColor: colors.primary,
    },
    forgotPasswordText: {
      ...styles.forgotPasswordText,
      color: colors.accent,
    },
    dividerLine: {
      ...styles.dividerLine,
      backgroundColor: colors.border,
    },
    loginButtonText: {
      ...styles.loginButtonText,
      color: colors.textWhite,
    },
    dividerText: {
      ...styles.dividerText,
      color: textColor,
    },
  });

  return (
    <View style={styles.form}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: textColor }]}>
          {t(translationKeys.login.emailLabel)}
        </Text>
        <View style={dynamicStyles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder={t(translationKeys.login.emailPlaceholder)}
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { color: textColor }]}>
          {t(translationKeys.login.passwordLabel)}
        </Text>
        <View style={dynamicStyles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder={t(translationKeys.login.passwordPlaceholder)}
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPassword}>
        <Text style={dynamicStyles.forgotPasswordText}>
          {t(translationKeys.login.forgotPassword)}
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={dynamicStyles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={dynamicStyles.loginButtonText}>
          {isLoading
            ? t(translationKeys.login.signingIn)
            : t(translationKeys.login.signIn)}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={dynamicStyles.dividerLine} />
        <Text style={dynamicStyles.dividerText}>
          {t(translationKeys.login.dividerText)}
        </Text>
        <View style={dynamicStyles.dividerLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.7,
  },
});
