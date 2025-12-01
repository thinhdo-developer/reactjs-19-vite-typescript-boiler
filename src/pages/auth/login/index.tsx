import { Button, CheckboxField, InputField } from "@/components";
import useAuth from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import type { LoginFormValues } from "./type";

const getValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    username: Yup.string()
      .required(t("auth.login.validation.username.required"))
      .min(3, t("auth.login.validation.username.minLength")),
    password: Yup.string()
      .required(t("auth.login.validation.password.required"))
      .min(6, t("auth.login.validation.password.minLength")),
    rememberMe: Yup.boolean(),
  });

const initialValues: LoginFormValues = {
  username: "",
  password: "",
  rememberMe: false,
};

export default function LoginPage() {
  const { t } = useTranslate();
  const { handleLoginSuccess } = useAuth();

  const mutation = useMutation({
    mutationFn: authServices.login,
    onSuccess: ({ data }) => {
      handleLoginSuccess(data);
    },
    onError: (error) => {
      console.error(error);
      // Error handling can be added here with toast notifications
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const { rememberMe, ...loginData } = values;

    if (rememberMe) {
      localStorage.setItem("rememberedUsername", values.username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    mutation.mutate(loginData);
  };

  const rememberedUsername = localStorage.getItem("rememberedUsername");

  const formInitialValues: LoginFormValues = {
    ...initialValues,
    ...(rememberedUsername && {
      username: rememberedUsername,
      rememberMe: true,
    }),
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("auth.login.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{t("auth.login.subtitle")}</p>
      </div>

      <Formik
        initialValues={formInitialValues}
        validationSchema={getValidationSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-6">
            <InputField
              name="username"
              label={t("auth.login.form.username.label")}
              placeholder={t("auth.login.form.username.placeholder")}
              type="text"
              required
              autoComplete="username"
            />

            <InputField
              name="password"
              label={t("auth.login.form.password.label")}
              placeholder={t("auth.login.form.password.placeholder")}
              type="password"
              required
              isEncryptField
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <CheckboxField
                name="rememberMe"
                label={t("auth.login.form.rememberMe.label")}
              />

              <div className="text-sm">
                <Link
                  to={PATHS.AUTH.FORGOT_PASSWORD}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {t("auth.login.form.forgotPassword.link")}
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                isLoading={mutation.isPending || isSubmitting}
                disabled={!isValid || !dirty || mutation.isPending}
              >
                {t("auth.login.form.submit")}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <span>{t("auth.login.form.noAccount")} </span>
              <Link
                to={PATHS.AUTH.REGISTER}
                className="font-medium text-primary hover:text-primary/80"
              >
                {t("auth.login.form.registerLink")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
