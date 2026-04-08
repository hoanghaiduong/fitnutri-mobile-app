export const onboardingSlides = [
  {
    id: '1',
    title: 'Dinh dưỡng cá nhân hóa',
    description:
      'Tạo thực đơn dựa trên hồ sơ cơ thể và mục tiêu tập luyện riêng của bạn.',
    accent: 'nutrition',
  },
  {
    id: '2',
    title: 'Theo dõi tiến độ dễ hiểu',
    description:
      'Theo dõi bữa ăn, chỉ số cơ thể và hành trình cải thiện sức khỏe mỗi ngày.',
    accent: 'insights',
  },
  {
    id: '3',
    title: 'Huấn luyện viên AI đồng hành',
    description:
      'Nhận gợi ý luyện tập và dinh dưỡng thông minh, đơn giản và thực tế.',
    accent: 'coach',
  },
] as const;

export const socialProviders = [
  { id: 'google', label: 'Google' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'apple', label: 'Apple' },
] as const;

export type SocialProvider = (typeof socialProviders)[number]['id'];
export type OtpIntent = 'reset-password' | 'register' | 'phone-login';
export type OtpChannel = 'email' | 'sms';
