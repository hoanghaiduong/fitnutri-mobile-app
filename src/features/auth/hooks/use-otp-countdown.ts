import { useEffect, useMemo, useState } from 'react';

import { authApi } from '@/services/auth-api';
import { otpService } from '@/services/otp-service';

export const useOtpCountdown = () => {
  const [countdownUntil, setCountdownUntil] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const hydrate = async () => {
      const value = await otpService.getCountdownUntil();
      setCountdownUntil(value);
    };

    void hydrate();
  }, []);

  useEffect(() => {
    const update = () => {
      if (!countdownUntil) {
        setRemainingSeconds(0);
        return;
      }

      const next = Math.max(0, Math.ceil((countdownUntil - Date.now()) / 1000));
      setRemainingSeconds(next);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [countdownUntil]);

  const canResend = useMemo(() => remainingSeconds === 0, [remainingSeconds]);

  const resend = async (): Promise<void> => {
    await authApi.resendOtp();
    const nextCountdownUntil = await otpService.startCountdown();
    setCountdownUntil(nextCountdownUntil);
  };

  return {
    canResend,
    remainingSeconds,
    resend,
  };
};
