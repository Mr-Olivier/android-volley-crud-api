// src/utils/validators.ts

import { z } from "zod";

/**
 * User Registration Validation Schema
 */
export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username cannot exceed 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .transform((val) => val.toLowerCase()),

    email: z
      .string()
      .email("Please provide a valid email address")
      .max(255, "Email cannot exceed 255 characters")
      .transform((val) => val.toLowerCase()),

    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number")
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password cannot exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/**
 * User Login Validation Schema
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),

  password: z.string().min(1, "Password is required"),
});

/**
 * OTP Verification Schema
 */
export const VerifyOTPSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),

  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

/**
 * Resend OTP Schema
 */
export const ResendOTPSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),
});

/**
 * Forgot Password Schema
 */
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),
});

/**
 * Verify Password Reset OTP Schema
 */
export const VerifyResetOTPSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.toLowerCase()),

  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

/**
 * Reset Password Schema
 */
export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Please provide a valid email address")
      .transform((val) => val.toLowerCase()),

    otp: z
      .string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d{6}$/, "OTP must contain only numbers"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password cannot exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

/**
 * Update Profile Schema
 */
export const UpdateProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .transform((val) => val.toLowerCase())
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number")
    .optional()
    .or(z.literal("")), // Allow empty string to remove phone number
});

/**
 * Change Password Schema
 */
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password cannot exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

// Export types for TypeScript
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type VerifyOTPInput = z.infer<typeof VerifyOTPSchema>;
export type ResendOTPInput = z.infer<typeof ResendOTPSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type VerifyResetOTPInput = z.infer<typeof VerifyResetOTPSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
