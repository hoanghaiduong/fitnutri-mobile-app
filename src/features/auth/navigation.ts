import { ROUTES } from '@/constants/routes';
import type { AuthSession } from '@/types/auth';

type PostLoginRoute = typeof ROUTES.dashboard | typeof ROUTES.profileSetup1;

export const getPostLoginRoute = (session: AuthSession): PostLoginRoute => {
  return session.user?.isProfileCompleted ? ROUTES.dashboard : ROUTES.profileSetup1;
};
