import { Stack } from 'expo-router';

import { RouteGuard } from '@/components/route-guard';

const DashboardStackLayout = () => (
  <RouteGuard requireAuth requireCompletedProfile>
    <Stack screenOptions={{ headerShown: false }} />
  </RouteGuard>
);

export default DashboardStackLayout;
