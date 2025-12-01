import { IUser } from "@/common/types/user";
import API_ENDPOINTS from "@configs/api";
import axiosInstances from "@utils/axiosClient";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./type";

const login = async (data: LoginRequest) => {
  return axiosInstances.host.postMethod<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

const getMe = async () => {
  return axiosInstances.host.getMethod<IUser>(API_ENDPOINTS.AUTH.ME);
};

const forgotPassword = async (data: ForgotPasswordRequest) => {
  return axiosInstances.host.postMethod<ForgotPasswordResponse>(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    data
  );
};

const verifyOtp = async (data: VerifyOtpRequest) => {
  return axiosInstances.host.postMethod<VerifyOtpResponse>(
    API_ENDPOINTS.AUTH.VERIFY_OTP,
    data
  );
};

const resetPassword = async (data: ResetPasswordRequest) => {
  return axiosInstances.host.postMethod<ResetPasswordResponse>(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    data
  );
};

const authServices = {
  login,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
};

export default authServices;
