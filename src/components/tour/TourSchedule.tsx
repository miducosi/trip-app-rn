import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { translationKeys } from '@/src/locales/keys';
import { TourDay } from '../../types/tour';

interface TourScheduleProps {
  tourDays: TourDay[];
  expandedDays: string[];
  textColor: string;
  onToggleDayExpansion: (dayId: string) => void;
}

export default function TourSchedule({
  tourDays,
  expandedDays,
  textColor,
  onToggleDayExpansion,
}: TourScheduleProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.scheduleContainer}>
      <View style={styles.tourTitleContainer}>
        <Text style={[styles.tourTitle, { color: textColor }]}>
          {t(translationKeys.tour.title)}
        </Text>
      </View>

      {tourDays.map((day) => (
        <View key={day.id} style={styles.dayCard}>
          <TouchableOpacity 
            style={styles.dayHeader}
            onPress={() => onToggleDayExpansion(day.id)}
          >
            <View style={styles.dayImageContainer}>
              <Image source={{ uri: day.image }} style={styles.dayImage} />
            </View>
            
            <View style={styles.dayInfo}>
              <Text style={styles.dayNumber}>{day.label}</Text>
              <Text style={[styles.dayTitle, { color: textColor }]}>{day.title}</Text>
            </View>
            
            <Ionicons 
              name={expandedDays.includes(day.id) ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedDays.includes(day.id) && (
            <View style={styles.daySchedule}>
              {day.schedule.map((item, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.scheduleTime}>{item.time}</Text>
                  <Text style={[styles.scheduleActivity, { color: textColor }]}>{item.activity}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleContainer: {
    marginBottom: 100, // Space for book button
  },
  tourTitleContainer: {
    marginBottom: 24,
  },
  tourTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dayImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  dayImage: {
    width: '100%',
    height: '100%',
  },
  dayInfo: {
    flex: 1,
  },
  dayNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  daySchedule: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  scheduleItem: {
    marginTop: 12,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  scheduleActivity: {
    fontSize: 16,
    lineHeight: 22,
  },
});
