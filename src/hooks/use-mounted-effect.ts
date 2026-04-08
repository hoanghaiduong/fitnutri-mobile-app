import { useEffect } from 'react';

export const useMountedEffect = (effect: () => void | (() => void)): void => {
  useEffect(effect, []);
};
