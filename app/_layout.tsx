import '../global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/theme/theme-provider';

const RootLayout = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen
          name="onboarding/[step]"
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen name="auth" />
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="plans/monthly" />
        <Stack.Screen name="plans/weekly" />
        <Stack.Screen name="results/summary" />
        <Stack.Screen name="features/emerald-vitality" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default RootLayout;
