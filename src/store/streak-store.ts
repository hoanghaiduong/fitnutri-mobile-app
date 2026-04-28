import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface StreakState {
  checkIns: Record<string, boolean>; // YYYY-MM-DD -> true
  checkInToday: () => void;
}

export const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const calculateStreak = (checkIns: Record<string, boolean>) => {
  const now = new Date();
  const todayStr = getLocalDateString(now);

  const hasCheckedInToday = !!checkIns[todayStr];

  let currentStreak = 0;
  const iterDate = new Date(now);
  
  if (!hasCheckedInToday) {
    iterDate.setDate(iterDate.getDate() - 1);
  }

  while (true) {
    const iterStr = getLocalDateString(iterDate);
    if (checkIns[iterStr]) {
      currentStreak++;
      iterDate.setDate(iterDate.getDate() - 1);
    } else {
      break;
    }
  }

  let longestStreak = 0;
  let tempStreak = 0;
  const sortedDates = Object.keys(checkIns).sort();
  
  if (sortedDates.length > 0) {
     let prevDate = new Date(sortedDates[0]);
     tempStreak = 1;
     longestStreak = 1;

     for (let i = 1; i < sortedDates.length; i++) {
       const currDate = new Date(sortedDates[i]);
       const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
       const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

       if (diffDays === 1) {
         tempStreak++;
         if (tempStreak > longestStreak) { longestStreak = tempStreak; }
       } else if (diffDays > 1) {
         tempStreak = 1; // reset
       }
       prevDate = currDate;
     }
  }

  const currentDayOfWeek = now.getDay(); // 0 is Sunday
  const diffToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  
  const weekDates = [];
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dStr = getLocalDateString(d);
    const isToday = dStr === todayStr;
    
    let status: 'checked_in' | 'missed' | 'future' | 'today_pending' = 'future';
    
    if (checkIns[dStr]) {
      status = 'checked_in';
    } else if (isToday) {
      status = 'today_pending';
    } else if (d.getTime() < now.getTime()) {
      status = 'missed';
    }
    
    weekDates.push({
      date: dStr,
      dayName: dayNames[i],
      isToday,
      status,
    });
  }

  return {
    hasCheckedInToday,
    currentStreak,
    longestStreak,
    weekDates,
  };
};

export const useStreakStore = create<StreakState>()(
  persist(
    (set) => ({
      checkIns: {},
      checkInToday: () => {
        const today = getLocalDateString(new Date());
        set((state) => ({
          checkIns: { ...state.checkIns, [today]: true },
        }));
      },
    }),
    {
      name: 'fitnutri-streak-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
