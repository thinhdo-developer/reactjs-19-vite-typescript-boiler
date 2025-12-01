import { Button, InputField } from "@/components";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type { ForgotPasswordFormValues } from "./type";

const getValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t("auth.forgotPassword.validation.email.required"))
      .email(t("auth.forgotPassword.validation.email.invalid")),
  });

const initialValues: ForgotPasswordFormValues = {
  email: "",
};

export default function ForgotPasswordPage() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authServices.forgotPassword,
    onSuccess: () => {
      // Store email for OTP verification
      const email = (
        document.querySelector('input[name="email"]') as HTMLInputElement
      )?.value;
      if (email) {
        navigate(`${PATHS.AUTH.VERIFY_OTP}?email=${encodeURIComponent(email)}`);
      }
    },
    onError: (error) => {
      console.error(error);
      // Error handling can be added here with toast notifications
    },
  });

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("auth.forgotPassword.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("auth.forgotPassword.subtitle")}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            {t("auth.forgotPassword.info")}
          </p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-6">
            <InputField
              name="email"
              label={t("auth.forgotPassword.form.email.label")}
              placeholder={t("auth.forgotPassword.form.email.placeholder")}
              type="email"
              required
              autoComplete="email"
              leftIcon={<Mail className="w-5 h-5" />}
            />

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                isLoading={mutation.isPending || isSubmitting}
                disabled={!isValid || !dirty || mutation.isPending}
              >
                {t("auth.forgotPassword.form.submit")}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to={PATHS.AUTH.LOGIN}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("auth.forgotPassword.form.backToLogin")}
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
              <span>{t("auth.forgotPassword.form.noAccount")} </span>
              <Link
                to={PATHS.AUTH.REGISTER}
                className="font-medium text-primary hover:text-primary/80"
              >
                {t("auth.forgotPassword.form.registerLink")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
