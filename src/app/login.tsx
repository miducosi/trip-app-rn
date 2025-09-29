import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        t(translationKeys.common.error),
        t(translationKeys.login.alerts.missingFields)
      );
      return;
    }

    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Call login action with mock data
      login('mock-jwt-token', 'user-123');
    }, 1500);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen (you can create this later)
    Alert.alert(
      t(translationKeys.login.alerts.signUpTitle),
      t(translationKeys.login.alerts.signUpMessage)
    );
  };

  const handleForgotPassword = () => {
    Alert.alert(
      t(translationKeys.login.alerts.forgotPasswordTitle),
      t(translationKeys.login.alerts.forgotPasswordMessage)
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t(translationKeys.login.title)}
        </Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Welcome Header */}
          <View style={styles.welcomeHeader}>
            <Text style={[styles.title, { color: colors.text }]}>
              {t(translationKeys.login.welcomeBack)}
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>
              {t(translationKeys.login.subtitle)}
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                {t(translationKeys.login.emailLabel)}
              </Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground }]}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={t(translationKeys.login.emailPlaceholder)}
                  placeholderTextColor="#666"
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
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                {t(translationKeys.login.passwordLabel)}
              </Text>
              <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground }]}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder={t(translationKeys.login.passwordPlaceholder)}
                  placeholderTextColor="#666"
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
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
                {t(translationKeys.login.forgotPassword)}
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: colors.tint }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading
                  ? t(translationKeys.login.signingIn)
                  : t(translationKeys.login.signIn)}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.text }]}>
                {t(translationKeys.login.dividerText)}
              </Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
                <Text style={[styles.socialButtonText, { color: colors.text }]}>
                  {t(translationKeys.login.socialGoogle)}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.cardBackground }]}>
                <Ionicons name="logo-apple" size={24} color="#000" />
                <Text style={[styles.socialButtonText, { color: colors.text }]}>
                  {t(translationKeys.login.socialApple)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.text }]}>
              {t(translationKeys.login.noAccount)}{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={[styles.signUpLink, { color: colors.tint }]}>
                {t(translationKeys.login.signUp)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerSpacer: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
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
    borderColor: '#e0e0e0',
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
    color: '#fff',
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
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
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
