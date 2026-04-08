import { Stack } from 'expo-router';

import { RouteGuard } from '@/components/route-guard';

const AuthLayout = () => (
  <RouteGuard guestOnly>
    <Stack screenOptions={{ headerShown: false }} />
  </RouteGuard>
);

export default AuthLayout;
