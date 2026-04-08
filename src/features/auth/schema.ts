import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ.'),
  password: z.string().min(6, 'Mật khẩu cần tối thiểu 6 ký tự.'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Vui lòng nhập email hợp lệ.'),
});

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .min(9, 'Vui lòng nhập số điện thoại hợp lệ.')
    .regex(/^[+0-9\s-]+$/, 'Số điện thoại chỉ nên chứa số hoặc dấu +.'),
});

export const otpSchema = z.object({
  code: z.string().length(6, 'Vui lòng nhập đủ 6 số OTP.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type PhoneLoginFormValues = z.infer<typeof phoneLoginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
