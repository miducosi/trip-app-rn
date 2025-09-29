import Toast from 'react-native-toast-message';
import i18n from './i18n';
import { translationKeys } from '@/src/locales/keys';

/**
 * Show an error toast notification
 */
export const showErrorToast = (message: string, title?: string) => {
  Toast.show({
    type: 'error',
    text1: title || i18n.t(translationKeys.common.error),
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show a success toast notification
 */
export const showSuccessToast = (message: string, title?: string) => {
  Toast.show({
    type: 'success',
    text1: title || i18n.t(translationKeys.common.success),
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show an info toast notification
 */
export const showInfoToast = (message: string, title?: string) => {
  Toast.show({
    type: 'info',
    text1: title || 'Info',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Show a warning toast notification
 */
export const showWarningToast = (message: string, title?: string) => {
  Toast.show({
    type: 'error', // Using error type for warning as well
    text1: title || 'Warning',
    text2: message,
    position: 'top',
    visibilityTime: 3500,
    autoHide: true,
    topOffset: 60,
  });
};

/**
 * Hide all toast notifications
 */
export const hideToast = () => {
  Toast.hide();
};
