import { Redirect } from 'expo-router';
import { type PropsWithChildren } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuthBootstrap } from '@/hooks/use-auth-bootstrap';
import { useAuthStore } from '@/store/auth-store';
import { Loader } from '@/ui/loader';
import { Screen } from '@/ui/screen';

type RouteGuardProps = PropsWithChildren<{
  requireAuth?: boolean;
  requireCompletedProfile?: boolean;
  requireIncompleteProfile?: boolean;
  guestOnly?: boolean;
}>;

export const RouteGuard = ({
  children,
  guestOnly = false,
  requireAuth = false,
  requireCompletedProfile = false,
  requireIncompleteProfile = false,
}: RouteGuardProps) => {
  const hydrated = useAuthBootstrap();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isProfileCompleted = Boolean(user?.isProfileCompleted);

  if (!hydrated) {
    return (
      <Screen>
        <Loader label="Đang kiểm tra phiên..." />
      </Screen>
    );
  }

  if (guestOnly) {
    if (!isAuthenticated) {
      return children;
    }

    return <Redirect href={isProfileCompleted ? ROUTES.dashboard : ROUTES.profileSetup1} />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Redirect href={ROUTES.login} />;
  }

  if (requireIncompleteProfile) {
    if (!isAuthenticated) {
      return <Redirect href={ROUTES.login} />;
    }

    if (isProfileCompleted) {
      return <Redirect href={ROUTES.dashboard} />;
    }
  }

  if (requireCompletedProfile) {
    if (!isAuthenticated) {
      return <Redirect href={ROUTES.login} />;
    }

    if (!isProfileCompleted) {
      return <Redirect href={ROUTES.profileSetup1} />;
    }
  }

  return children;
};
