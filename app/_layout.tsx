import '../global.css';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppGlobalSidebar } from '@/components/app-global-sidebar';
import { AppOfflineBanner } from '@/components/app-offline-banner';
import { useNetworkMonitor } from '@/hooks/use-network-monitor';
import { ThemeProvider } from '@/theme/theme-provider';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useNetworkMonitor();

  // Don't render until fonts are ready
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <>
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
          </Stack>
          <AppGlobalSidebar />
          <AppOfflineBanner />
        </>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
