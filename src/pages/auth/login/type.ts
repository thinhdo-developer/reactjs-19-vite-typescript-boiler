import { LoginRequest } from "@/services/auth/type";

export type LoginFormValues = LoginRequest & {
  rememberMe: boolean;
};

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  initialValues?: Partial<LoginFormValues>;
  isLoading?: boolean;
};

