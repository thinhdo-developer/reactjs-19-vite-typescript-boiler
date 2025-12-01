import { UserRole } from "@/common/enums";
import ForgotPasswordForm from "@/components/shared/forgotPasswordForm";
import React from "react";

const ForgotPassword: React.FC = () => {
  return <ForgotPasswordForm role={UserRole.ShopOwner} />;
};

export default ForgotPassword;
