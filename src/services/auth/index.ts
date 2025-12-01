import axiosInstances from "@utils/axiosClient";
import { LoginRequest, LoginResponse } from "./type";
import API_ENDPOINTS from "@configs/api";
import { IUser } from "@/common/types/user";

const login = async (data: LoginRequest) => {
  return axiosInstances.host.postMethod<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

const getMe = async () => {
  return axiosInstances.host.getMethod<IUser>(API_ENDPOINTS.AUTH.ME);
};

const authServices = {
  login,
  getMe,
};

export default authServices;
