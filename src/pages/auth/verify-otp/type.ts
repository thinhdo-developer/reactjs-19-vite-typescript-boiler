import { VerifyOtpRequest } from "@/services/auth/type";

export type VerifyOtpFormValues = VerifyOtpRequest;

export type VerifyOtpFormProps = {
  onSubmit: (values: VerifyOtpFormValues) => void | Promise<void>;
  initialValues?: Partial<VerifyOtpFormValues>;
  isLoading?: boolean;
  email: string;
  onResendOtp?: () => void;
  resendCooldown?: number;
};

