import { Button, InputField, OtpInputField } from "@/components";
import { OTP_LENGTH, OTP_RESEND_TIME } from "@/configs/common";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { ArrowLeft, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import type { VerifyOtpFormValues } from "./type";

const getValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t("auth.verifyOtp.validation.email.required"))
      .email(t("auth.verifyOtp.validation.email.invalid")),
    otp: Yup.string()
      .required(t("auth.verifyOtp.validation.otp.required"))
      .length(
        OTP_LENGTH,
        t("auth.verifyOtp.validation.otp.length").replace(
          "{length}",
          String(OTP_LENGTH)
        )
      ),
  });

export default function VerifyOtpPage() {
  const { t } = useTranslate();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const initialValues: VerifyOtpFormValues = {
    email: email,
    otp: "",
  };

  const verifyMutation = useMutation({
    mutationFn: authServices.verifyOtp,
    onSuccess: ({ data }) => {
      if (data.token) {
        navigate(
          `${PATHS.AUTH.RESET_PASSWORD}?token=${encodeURIComponent(data.token)}`
        );
      }
    },
    onError: (error) => {
      console.error(error);
      // Error handling can be added here with toast notifications
    },
  });

  const resendMutation = useMutation({
    mutationFn: authServices.forgotPassword,
    onSuccess: () => {
      setResendCooldown(OTP_RESEND_TIME);
      setIsResending(false);
    },
    onError: (error) => {
      console.error(error);
      setIsResending(false);
    },
  });

  const handleSubmit = async (values: VerifyOtpFormValues) => {
    verifyMutation.mutate(values);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0 || isResending || !email) return;

    setIsResending(true);
    resendMutation.mutate({ email });
  };

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (!email) {
      navigate(PATHS.AUTH.FORGOT_PASSWORD);
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("auth.verifyOtp.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("auth.verifyOtp.subtitle")
            .replace("{email}", email)
            .replace("{length}", String(OTP_LENGTH))}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">{t("auth.verifyOtp.info")}</p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="space-y-6">
            <InputField
              name="email"
              label={t("auth.verifyOtp.form.email.label")}
              type="email"
              required
              disabled
              autoComplete="email"
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <OtpInputField
              name="otp"
              label={t("auth.verifyOtp.form.otp.label")}
              length={OTP_LENGTH}
              required
              autoFocus
            />

            <div className="text-center text-sm text-gray-600">
              <span>{t("auth.verifyOtp.form.didntReceive")} </span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isResending}
                className="font-medium text-primary hover:text-primary/80 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {resendCooldown > 0
                  ? t("auth.verifyOtp.form.resendCooldown").replace(
                      "{seconds}",
                      String(resendCooldown)
                    )
                  : t("auth.verifyOtp.form.resend")}
              </button>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                isLoading={verifyMutation.isPending || isSubmitting}
                disabled={
                  !isValid ||
                  !dirty ||
                  verifyMutation.isPending ||
                  values.otp.length !== OTP_LENGTH
                }
              >
                {t("auth.verifyOtp.form.submit")}
              </Button>
            </div>

            <div className="text-center">
              <Link
                to={PATHS.AUTH.FORGOT_PASSWORD}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("auth.verifyOtp.form.back")}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
