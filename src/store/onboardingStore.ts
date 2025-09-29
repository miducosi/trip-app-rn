import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  isCompleted: boolean;
  permissionsGranted: {
    notifications: boolean;
    location: boolean;
  };
  setOnboardingCompleted: (completed: boolean) => void;
  setPermissionGranted: (type: 'notifications' | 'location', granted: boolean) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isCompleted: false,
      permissionsGranted: {
        notifications: false,
        location: false,
      },
      setOnboardingCompleted: (completed: boolean) =>
        set({ isCompleted: completed }),
      setPermissionGranted: (type: 'notifications' | 'location', granted: boolean) =>
        set((state) => ({
          permissionsGranted: {
            ...state.permissionsGranted,
            [type]: granted,
          },
        })),
      resetOnboarding: () =>
        set({
          isCompleted: false,
          permissionsGranted: {
            notifications: false,
            location: false,
          },
        }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
