// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: "/auth",
};

export const PATHS = {
  HOME: "/",
  AUTH: {
    LOGIN: `${ROOTS.AUTH}/login`,
    REGISTER: `${ROOTS.AUTH}/register`,
    FORGOT_PASSWORD: `${ROOTS.AUTH}/forgot-password`,
    VERIFY_OTP: `${ROOTS.AUTH}/verify-otp`,
    RESET_PASSWORD: `${ROOTS.AUTH}/reset-password`,
  },
  PUBLIC: {
    NOT_FOUND: "/404",
    FORBIDDEN: "/403",
    SERVER_ERROR: "/500",
  },
};
