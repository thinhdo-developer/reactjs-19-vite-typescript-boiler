// import { HOST_API_VERSION } from "./env";

const AUTH_URL = `auth/`;

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH_URL}login`,
    LOGOUT: `${AUTH_URL}logout`,
    REGISTER: `${AUTH_URL}register`,
    ME: `${AUTH_URL}me`,
    SILENT_LOGIN: `${AUTH_URL}silent-login`,
  },
};

export default API_ENDPOINTS;
