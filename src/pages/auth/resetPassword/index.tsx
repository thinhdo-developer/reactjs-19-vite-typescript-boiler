import Button from "@/components/button";
import { MIN_PASSWORD_LENGTH } from "@/configs/common";
import { useTranslate } from "@/hooks/useTranslate";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { ResetPasswordFormValues } from "./type";

const ResetPassword: React.FC = () => {
  const { t } = useTranslate({
    keyPrefix: "resetPasswordForm",
  });
  // const { error, handleError, resetError } = useHandleError();
  // const { push } = useCustomRouter();

  const onSubmit = async () => {
    // resetError();
    // try {
    //   await authServices.resetPassword({
    //     newPassword: values.newPassword,
    //     acccessToken: searchParams.get("accessToken") ?? "",
    //   });
    //   showSuccessToast(t("successMessage"));
    //   push(loginPath);
    // } catch (error) {
    //   handleError(error);
    // }
  };

  const ValidateSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(
        MIN_PASSWORD_LENGTH,
        t("newPassword.error.minLength", { length: MIN_PASSWORD_LENGTH })
      )
      .matches(/[A-Z]/, t("newPassword.error.uppercase"))
      .required(t("newPassword.error.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("confirmPassword.error.invalid"))
      .required(t("confirmPassword.error.required")),
  });

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnMount: true,
    validationSchema: ValidateSchema,
    onSubmit,
  });

  const { handleSubmit, isValid, isSubmitting } = formik;

  // useEffect(() => {
  //   resetError();
  // }, [values, resetError]);

  return (
    <div className="flex flex-col items-center">
      <div className=" flex flex-col items-center border-x border-b border-t-4 border-primary px-6 py-7 w-full rounded-2xl bg-white lg:min-w-[600px]">
        {/* <Logo className="w-32 mb-6" role={role} /> */}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="w-full ">
            {/* <InputField
              label={t("newPassword.title")}
              placeholder={t("newPassword.placeholder")}
              type="password"
              id="newPassword"
              name="newPassword"
              required
              isEncryptField
            />
            <InputField
              label={t("confirmPassword.title")}
              placeholder={t("confirmPassword.placeholder")}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              containerClassName="mt-4"
              isEncryptField
            />
            <ErrorMessage message={error?.message} /> */}
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                className="min-w-[178px]"
                disabled={!isValid}
                isLoading={isSubmitting}
              >
                {t("resetPasswordBtn")}
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <NavLink
        to={"/login"}
        className="text-primary font-semibold underline hover:opacity-80 mt-10 flex items-center gap-2"
      >
        {/* <ArrowLeftIcon className="w-5 h-5 stroke-primary" /> */}
        {t("backToLogin")}
      </NavLink>
    </div>
  );
};

export default ResetPassword;
