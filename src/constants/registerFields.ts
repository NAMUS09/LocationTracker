import {
  EmailField,
  PasswordField,
  PasswordRegex,
  PasswordValidationMessage,
} from "./commonFields";
import { Fields } from "./interfaces/fields";

const signupFields: Fields[] = [
  {
    label: "Full Name",
    id: "name",
    type: "text",
    required: true,
    placeholder: "fullname",
    requiredMessage: "Full Name is required",
  },
  EmailField,
  PasswordField,
  {
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    required: true,
    placeholder: "Confirm Password",
    pattern: PasswordRegex,
    validate: true,
    requiredMessage: "Confirm Password is required",
    patternMessage: PasswordValidationMessage,
    validationMessage: "The passwords do not match",
  },
];

export default signupFields;
