import { type ErrorInfo, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <View style={{ flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 24 }}>
    <View style={{ borderRadius: 28, backgroundColor: '#FFFFFF', padding: 20, gap: 14, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 6 }}>
      <Text style={{ color: '#0F172A', fontSize: 24, fontWeight: '700' }}>Đã xảy ra lỗi ngoài dự kiến</Text>
      <Text style={{ color: '#64748B', fontSize: 15, lineHeight: 22 }}>
        Ứng dụng đã chặn lỗi để tránh màn hình trắng. Bạn có thể thử lại hoặc gửi nội dung lỗi này cho mình để sửa tiếp.
      </Text>
      <ScrollView style={{ maxHeight: 180, borderRadius: 16, backgroundColor: '#F8FAFC', padding: 12 }}>
        <Text style={{ color: '#B91C1C', fontSize: 13 }}>{error.message}</Text>
      </ScrollView>
      <Pressable onPress={resetErrorBoundary} style={{ minHeight: 52, borderRadius: 18, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Thử lại</Text>
      </Pressable>
    </View>
  </View>
);

const onError = (error: Error, info: ErrorInfo) => {
  console.error('AppErrorBoundary', error, info.componentStack);
};

export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
    {children}
  </ErrorBoundary>
);
