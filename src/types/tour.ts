import { TranslationKey } from '@/src/locales/keys';

export type TabId = 'schedule' | 'accommodation' | 'bookingDetails';

export interface TourDayConfig {
  id: string;
  labelKey: TranslationKey;
  titleKey: TranslationKey;
  image: string;
  schedule: Array<{
    timeKey: TranslationKey;
    activityKey: TranslationKey;
  }>;
}

export interface TourDay {
  id: string;
  image: string;
  label: string;
  title: string;
  schedule: Array<{
    time: string;
    activity: string;
  }>;
}
