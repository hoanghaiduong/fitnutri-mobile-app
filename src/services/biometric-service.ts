import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export type BiometricAuthenticationError = LocalAuthentication.LocalAuthenticationError | 'unknown';

export type BiometricAuthenticationResult =
  | { success: true }
  | { success: false; error: BiometricAuthenticationError; warning?: string };

const localAuthenticationOptions: LocalAuthentication.LocalAuthenticationOptions = {
  cancelLabel: 'Hủy',
  disableDeviceFallback: false,
  fallbackLabel: 'Sử dụng mật mã',
  biometricsSecurityLevel: 'weak',
  requireConfirmation: false,
};

const hasDeviceAuthenticationAsync = async (): Promise<boolean> => {
  const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
  return securityLevel !== LocalAuthentication.SecurityLevel.NONE;
};

export const biometricService = {
  // Allows biometrics or the device passcode/pattern/PIN.
  isSupported: async (): Promise<boolean> => {
    try {
      return await hasDeviceAuthenticationAsync();
    } catch {
      return false;
    }
  },

  authenticateWithResult: async (
    promptMessage = 'Xác thực bằng Face ID / Vân tay / mật mã'
  ): Promise<BiometricAuthenticationResult> => {
    try {
      const hasDeviceAuthentication = await hasDeviceAuthenticationAsync();
      if (!hasDeviceAuthentication) {
        return { success: false, error: 'passcode_not_set' };
      }

      const result = await LocalAuthentication.authenticateAsync({
        ...localAuthenticationOptions,
        promptMessage,
      });

      if (result.success) {
        return { success: true };
      }

      return {
        success: false,
        error: result.error,
        warning: result.warning,
      };
    } catch {
      return { success: false, error: 'unknown' };
    }
  },

  authenticate: async (promptMessage = 'Xác thực bằng Face ID / Vân tay / mật mã'): Promise<boolean> => {
    const result = await biometricService.authenticateWithResult(promptMessage);
    return result.success;
  },

  saveSecureItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Failed to save to SecureStore', e);
    }
  },

  getSecureItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  deleteSecureItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Ignore.
    }
  },
};
