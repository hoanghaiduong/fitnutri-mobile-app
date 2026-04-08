import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { ROUTES } from '@/constants/routes';
import { type SocialProvider } from '@/features/auth/constants';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { SocialLogin } from '@/features/auth/components/social-login';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const socialLabelMap: Record<SocialProvider, string> = {
  google: 'Google',
  facebook: 'Facebook',
  apple: 'Apple',
};

const LoginBody = () => {
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();
  const [email, setEmail] = useState('debug@fitnutri.app');
  const [password, setPassword] = useState('123456');
  const [submitting, setSubmitting] = useState(false);
  const [activeMethod, setActiveMethod] = useState<SocialProvider | 'phone' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await login({ email, password, name: email.split('@')[0], provider: 'password' });
      toast('Đăng nhập thành công', 'Phiên làm việc đã được khởi tạo.', 'success');
      router.replace(ROUTES.profileSetup1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setActiveMethod(provider);
      setError(null);
      await login({ provider, name: `${socialLabelMap[provider]} User` });
      toast(`Đã tiếp tục với ${socialLabelMap[provider]}`, 'Luồng social login demo đã được kích hoạt.', 'success');
      router.replace(ROUTES.profileSetup1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể đăng nhập lúc này.');
    } finally {
      setActiveMethod(null);
    }
  };

  return (
    <AuthShell
      accent="primary"
      eyebrow="Đăng nhập"
      heroIcon="log-in-outline"
      sectionBadge="Email"
      sectionTitle="Đăng nhập bằng email"
      sectionDescription="Nhập thông tin của bạn hoặc chọn một cách đăng nhập nhanh bên dưới."
      subtitle="Tiếp tục hành trình của bạn với cách đăng nhập phù hợp nhất."
      title="Chào bạn quay lại"
      footer={
        <View className="items-center gap-3">
          <Text tone="muted" variant="caption">
            Chưa có tài khoản hoặc cần khôi phục quyền truy cập?
          </Text>
          <Button className="w-full" onPress={() => router.push(ROUTES.registerStep1)} size="md" title="Tạo tài khoản mới" variant="secondary" />
          <Button onPress={() => router.push(ROUTES.forgotPassword)} size="sm" title="Quên mật khẩu" variant="ghost" />
        </View>
      }
    >
      <View className="gap-4">
        <Input
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="tenban@example.com"
          value={email}
        />
        <Input
          autoComplete="password"
          label="Mật khẩu"
          onChangeText={setPassword}
          placeholder="Nhập mật khẩu của bạn"
          secureTextEntry
          value={password}
        />
      </View>

      {error ? (
        <Text tone="destructive" variant="caption">
          {error}
        </Text>
      ) : (
        <Text tone="muted" variant="caption">
          Tài khoản demo mặc định đã được điền sẵn để bạn vào app nhanh hơn.
        </Text>
      )}

      <View className="gap-4 border-t border-border/40 pt-4">
        <Button
          className="w-full"
          leftSlot={<Ionicons color="#FFFFFF" name="log-in-outline" size={18} />}
          loading={submitting}
          onPress={handleLogin}
          size="lg"
          title="Đăng nhập"
        />

        <SocialLogin
          activeMethod={activeMethod}
          onPhonePress={() => router.push(ROUTES.phoneLogin)}
          onProviderPress={handleSocialLogin}
        />
      </View>
    </AuthShell>
  );
};

const LoginScreen = () => (
  <AppErrorBoundary>
    <LoginBody />
  </AppErrorBoundary>
);

export default LoginScreen;
