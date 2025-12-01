import { Button, InputField } from "@/components";
import { MIN_PASSWORD_LENGTH } from "@/configs/common";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import type { ResetPasswordFormValues } from "./type";

const getValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    newPassword: Yup.string()
      .required(t("auth.resetPassword.validation.newPassword.required"))
      .min(
        MIN_PASSWORD_LENGTH,
        t("auth.resetPassword.validation.newPassword.minLength")
      )
      .matches(
        /[A-Z]/,
        t("auth.resetPassword.validation.newPassword.uppercase")
      )
      .matches(
        /[a-z]/,
        t("auth.resetPassword.validation.newPassword.lowercase")
      )
      .matches(/\d/, t("auth.resetPassword.validation.newPassword.number"))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t("auth.resetPassword.validation.newPassword.special")
      ),
    confirmPassword: Yup.string()
      .required(t("auth.resetPassword.validation.confirmPassword.required"))
      .oneOf(
        [Yup.ref("newPassword")],
        t("auth.resetPassword.validation.confirmPassword.match")
      ),
  });

const initialValues: ResetPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
};

export default function ResetPasswordPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: authServices.resetPassword,
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        navigate(PATHS.AUTH.LOGIN);
      }, 3000);
    },
    onError: (error) => {
      console.error(error);
      // Error handling can be added here with toast notifications
    },
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      console.error("Reset token is missing");
      return;
    }

    mutation.mutate({
      ...values,
      token,
    });
  };

  useEffect(() => {
    if (!token) {
      navigate(PATHS.AUTH.FORGOT_PASSWORD);
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="w-full">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("auth.resetPassword.success.title")}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t("auth.resetPassword.success.message")}
          </p>
          <Link to={PATHS.AUTH.LOGIN}>
            <Button fullWidth variant="primary">
              {t("auth.resetPassword.success.backToLogin")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("auth.resetPassword.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("auth.resetPassword.subtitle")}
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-6">
            <InputField
              name="newPassword"
              label={t("auth.resetPassword.form.newPassword.label")}
              placeholder={t("auth.resetPassword.form.newPassword.placeholder")}
              type="password"
              required
              isEncryptField
              autoComplete="new-password"
              leftIcon={<Lock className="w-5 h-5" />}
            />

            <InputField
              name="confirmPassword"
              label={t("auth.resetPassword.form.confirmPassword.label")}
              placeholder={t(
                "auth.resetPassword.form.confirmPassword.placeholder"
              )}
              type="password"
              required
              isEncryptField
              autoComplete="new-password"
              leftIcon={<Lock className="w-5 h-5" />}
            />

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-2">
                {t("auth.resetPassword.form.passwordRequirements.title")}:
              </p>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                <li>
                  {t(
                    "auth.resetPassword.form.passwordRequirements.minLength"
                  ).replace("{length}", String(MIN_PASSWORD_LENGTH))}
                </li>
                <li>
                  {t("auth.resetPassword.form.passwordRequirements.uppercase")}
                </li>
                <li>
                  {t("auth.resetPassword.form.passwordRequirements.lowercase")}
                </li>
                <li>
                  {t("auth.resetPassword.form.passwordRequirements.number")}
                </li>
                <li>
                  {t("auth.resetPassword.form.passwordRequirements.special")}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                isLoading={mutation.isPending || isSubmitting}
                disabled={!isValid || !dirty || mutation.isPending}
              >
                {t("auth.resetPassword.form.submit")}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to={PATHS.AUTH.LOGIN}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("auth.resetPassword.form.backToLogin")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
