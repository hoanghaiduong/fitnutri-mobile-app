import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useMemo } from 'react';

import { useStreakStore, calculateStreak } from '@/store/streak-store';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';

export const StreakWidget = () => {
  const checkInToday = useStreakStore((state) => state.checkInToday);
  const checkIns = useStreakStore((state) => state.checkIns);

  const calculations = useMemo(() => calculateStreak(checkIns), [checkIns]);
  const { currentStreak, longestStreak, hasCheckedInToday, weekDates } = calculations;

  const handleCheckIn = () => {
    if (!hasCheckedInToday) {
      checkInToday();
    }
  };

  return (
    <Card elevated className="gap-5 rounded-[30px] p-5 border-border bg-primary/5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#FEE2E2]">
            <Ionicons color="#EF4444" name="flame" size={26} />
          </View>
          <View>
            <Text variant="heading-md">{currentStreak} ngày liên tiếp!</Text>
            <Text tone="muted" variant="caption">Kỷ lục dài nhất: {longestStreak} ngày</Text>
          </View>
        </View>
        {hasCheckedInToday ? (
          <View className="flex-row items-center gap-1 rounded-full bg-primary/15 px-3 py-1.5">
            <Ionicons color="#10B981" name="checkmark-circle" size={16} />
            <Text tone="primary" variant="caption">Hoàn thành</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row justify-between px-1">
        {weekDates.map((day) => {
          const isCheckedIn = day.status === 'checked_in';
          const isMissed = day.status === 'missed';
          const isPending = day.status === 'today_pending';

          const bgClass = isMissed ? 'bg-secondary/60 opacity-60' : 'bg-transparent';
          
          let dayStyle: any = { borderWidth: 1, borderColor: 'transparent' };
          let textTone = 'muted';

          if (isCheckedIn) {
            dayStyle = { backgroundColor: '#FEE2E2', borderColor: 'rgba(239, 68, 68, 0.3)', borderWidth: 1 };
            textTone = 'primary';
          } else if (isPending) {
            dayStyle = { backgroundColor: 'transparent', borderColor: 'rgba(16, 185, 129, 0.5)', borderStyle: 'dashed', borderWidth: 2 };
            textTone = 'default';
          }

          return (
            <View key={day.date} className="items-center gap-2">
              <View
                className={`h-11 w-11 items-center justify-center rounded-full border ${bgClass}`}
                style={dayStyle}
              >
                {isCheckedIn ? (
                  <Ionicons color="#EF4444" name="flame" size={20} />
                ) : isMissed ? (
                  <Ionicons color="#94A3B8" name="close" size={16} />
                ) : (
                  <Text tone={textTone as any} variant={day.isToday ? 'body-md' : 'body-sm'}>{day.date.split('-')[2]}</Text>
                )}
              </View>
              <Text tone={day.isToday ? 'primary' : 'muted'} variant="caption" className={day.isToday ? 'font-semibold' : ''}>
                {day.dayName}
              </Text>
            </View>
          );
        })}
      </View>

      {!hasCheckedInToday ? (
        <Button
          leftSlot={<Ionicons color="#FFFFFF" name="flame" size={18} />}
          onPress={handleCheckIn}
          title="Điểm danh hôm nay"
        />
      ) : null}
    </Card>
  );
};
