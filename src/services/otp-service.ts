import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';

const OTP_COOLDOWN_SECONDS = 30;

export const otpService = {
  getCountdownUntil: async (): Promise<number> => {
    return (await storage.getItem<number>(STORAGE_KEYS.otpCountdownUntil)) ?? 0;
  },
  startCountdown: async (): Promise<number> => {
    const countdownUntil = Date.now() + OTP_COOLDOWN_SECONDS * 1000;
    await storage.setItem(STORAGE_KEYS.otpCountdownUntil, countdownUntil);
    return countdownUntil;
  },
  resetCountdown: async (): Promise<void> => {
    await storage.removeItem(STORAGE_KEYS.otpCountdownUntil);
  },
  getCooldownSeconds: (): number => OTP_COOLDOWN_SECONDS,
};
