import { TourDayConfig, TabId } from '../types/tour';
import { translationKeys } from '@/src/locales/keys';

export const tabIds: TabId[] = ['schedule', 'accommodation', 'bookingDetails'];

export const tourDayConfigs: TourDayConfig[] = [
  {
    id: '1',
    labelKey: translationKeys.tour.days.day1.label,
    titleKey: translationKeys.tour.days.day1.title,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
    schedule: [
      {
        timeKey: translationKeys.tour.scheduleTime.morning,
        activityKey: translationKeys.tour.days.day1.schedule.morning,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.afternoon,
        activityKey: translationKeys.tour.days.day1.schedule.afternoon,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.evening,
        activityKey: translationKeys.tour.days.day1.schedule.evening,
      },
    ],
  },
  {
    id: '2',
    labelKey: translationKeys.tour.days.day2.label,
    titleKey: translationKeys.tour.days.day2.title,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
    schedule: [
      {
        timeKey: translationKeys.tour.scheduleTime.morning,
        activityKey: translationKeys.tour.days.day2.schedule.morning,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.afternoon,
        activityKey: translationKeys.tour.days.day2.schedule.afternoon,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.evening,
        activityKey: translationKeys.tour.days.day2.schedule.evening,
      },
    ],
  },
  {
    id: '3',
    labelKey: translationKeys.tour.days.day3.label,
    titleKey: translationKeys.tour.days.day3.title,
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=100&h=100&fit=crop',
    schedule: [
      {
        timeKey: translationKeys.tour.scheduleTime.morning,
        activityKey: translationKeys.tour.days.day3.schedule.morning,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.afternoon,
        activityKey: translationKeys.tour.days.day3.schedule.afternoon,
      },
      {
        timeKey: translationKeys.tour.scheduleTime.evening,
        activityKey: translationKeys.tour.days.day3.schedule.evening,
      },
    ],
  },
];
