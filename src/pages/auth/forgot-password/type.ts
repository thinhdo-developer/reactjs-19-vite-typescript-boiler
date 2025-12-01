import { ForgotPasswordRequest } from "@/services/auth/type";

export type ForgotPasswordFormValues = ForgotPasswordRequest;

export type ForgotPasswordFormProps = {
  onSubmit: (values: ForgotPasswordFormValues) => void | Promise<void>;
  initialValues?: Partial<ForgotPasswordFormValues>;
  isLoading?: boolean;
};
