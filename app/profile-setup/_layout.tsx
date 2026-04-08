import { Stack } from 'expo-router';

import { RouteGuard } from '@/components/route-guard';

const ProfileSetupLayout = () => (
  <RouteGuard requireIncompleteProfile>
    <Stack screenOptions={{ headerShown: false }} />
  </RouteGuard>
);

export default ProfileSetupLayout;
