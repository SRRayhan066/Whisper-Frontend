import { SignInFormFields } from "@/lib/form-fields/SignInFormFields";
import { Regex } from "@/lib/constants/Regex";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/lib/constants/ApplicationConstant";

const validateEmail = {
  required: "Email is required",
  pattern: {
    value: Regex.EMAIL,
    message: "Please enter a valid email address",
  },
};

const validatePassword = {
  required: "Password is required",
  minLength: {
    value: PASSWORD_MIN_LENGTH,
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  },
  maxLength: {
    value: PASSWORD_MAX_LENGTH,
    message: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`,
  },
};

const validationRules = {
  [SignInFormFields.EMAIL]: validateEmail,
  [SignInFormFields.PASSWORD]: validatePassword,
};

export const getValidationRules = (field) => {
  return validationRules[field] || {};
};
