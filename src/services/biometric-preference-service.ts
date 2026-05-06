import { settingsApi } from '@/services/api/settings-api';
import { biometricService, type BiometricAuthenticationError } from '@/services/biometric-service';
import { tokenService } from '@/services/token-service';

export type BiometricPreferenceFailureReason = 'unsupported' | 'authentication_failed' | 'persist_failed';

export type BiometricPreferenceResult =
  | { ok: true; enabled: boolean }
  | {
      ok: false;
      reason: BiometricPreferenceFailureReason;
      authenticationError?: BiometricAuthenticationError;
      warning?: string;
    };

const defaultEnablePrompt = 'Xác thực để bật mở khóa bằng Face ID / vân tay / mật mã';

const rollbackBiometricPreference = async (enabled: boolean): Promise<void> => {
  try {
    await settingsApi.updatePreferences({ biometricUnlockEnabled: enabled });
    await tokenService.setBiometricEnabled(enabled);
  } catch {
    // Best effort rollback; callers still receive the original failure.
  }
};

export const biometricPreferenceService = {
  isEnabled: async (): Promise<boolean> => tokenService.isBiometricEnabled(),

  isSupported: async (): Promise<boolean> => biometricService.isSupported(),

  setEnabled: async (
    enabled: boolean,
    promptMessage = defaultEnablePrompt
  ): Promise<BiometricPreferenceResult> => {
    const previousEnabled = await tokenService.isBiometricEnabled();

    if (enabled) {
      const isSupported = await biometricService.isSupported();
      if (!isSupported) {
        return { ok: false, reason: 'unsupported' };
      }

      if (!previousEnabled) {
        const authenticationResult = await biometricService.authenticateWithResult(promptMessage);
        if (!authenticationResult.success) {
          return {
            ok: false,
            reason: 'authentication_failed',
            authenticationError: authenticationResult.error,
            warning: authenticationResult.warning,
          };
        }
      }
    }

    if (previousEnabled === enabled) {
      return { ok: true, enabled };
    }

    try {
      await settingsApi.updatePreferences({ biometricUnlockEnabled: enabled });
      await tokenService.setBiometricEnabled(enabled);
      return { ok: true, enabled };
    } catch {
      await rollbackBiometricPreference(previousEnabled);
      return { ok: false, reason: 'persist_failed' };
    }
  },
};
