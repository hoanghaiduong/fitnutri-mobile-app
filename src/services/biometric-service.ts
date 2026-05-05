import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export const biometricService = {
  // Check if hardware exists and user is enrolled
  isSupported: async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) return false;
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      return isEnrolled;
    } catch {
      return false;
    }
  },

  // Perform authentication
  authenticate: async (promptMessage = 'Xác thực bằng Face ID / Vân tay'): Promise<boolean> => {
    try {
      const isSupported = await biometricService.isSupported();
      if (!isSupported) return false;

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Sử dụng mật khẩu',
        disableDeviceFallback: false,
        cancelLabel: 'Hủy',
      });

      return result.success;
    } catch {
      return false;
    }
  },

  // Securely save an item
  saveSecureItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Failed to save to SecureStore', e);
    }
  },

  // Securely retrieve an item
  getSecureItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  // Securely delete an item
  deleteSecureItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Ignore
    }
  },
};
