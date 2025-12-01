export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
  success: boolean;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  token: string;
  message: string;
  success: boolean;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
  success: boolean;
};