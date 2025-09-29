import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useThemeColor';
import LoginHeader from '../components/auth/LoginHeader';
import WelcomeHeader from '../components/auth/WelcomeHeader';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from '../components/auth/SocialLogin';
import SignUpLink from '../components/auth/SignUpLink';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const { login } = useAuthStore();
  const { colors } = useTheme();
  const backgroundColor = colors.backgroundPrimary;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
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

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    Alert.alert(
      'Google Login',
      'Google login functionality will be implemented here'
    );
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
    Alert.alert(
      'Apple Login',
      'Apple login functionality will be implemented here'
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button */}
      <LoginHeader />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Login Form */}
          <LoginForm 
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            isLoading={isLoading}
          />

          {/* Social Login Buttons */}
          <SocialLogin 
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
          />

          {/* Sign Up Link */}
          <SignUpLink onSignUpPress={handleSignUp} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
