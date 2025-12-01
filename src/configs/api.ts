// import { HOST_API_VERSION } from "./env";

const AUTH_URL = `auth/`;

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH_URL}login`,
    LOGOUT: `${AUTH_URL}logout`,
    REGISTER: `${AUTH_URL}register`,
    ME: `${AUTH_URL}me`,
    SILENT_LOGIN: `${AUTH_URL}silent-login`,
    FORGOT_PASSWORD: `${AUTH_URL}forgot-password`,
    VERIFY_OTP: `${AUTH_URL}verify-otp`,
    RESET_PASSWORD: `${AUTH_URL}reset-password`,
  },
};

export default API_ENDPOINTS;
