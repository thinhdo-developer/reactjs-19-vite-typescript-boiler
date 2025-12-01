import { ResetPasswordRequest } from "@/services/auth/type";

export type ResetPasswordFormValues = Omit<ResetPasswordRequest, "token">;

export type ResetPasswordFormProps = {
  onSubmit: (values: ResetPasswordFormValues) => void | Promise<void>;
  initialValues?: Partial<ResetPasswordFormValues>;
  isLoading?: boolean;
  token: string;
};
