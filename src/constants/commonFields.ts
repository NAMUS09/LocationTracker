import { Fields } from "./interfaces/fields";

export const PasswordRegex: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export const PasswordValidationMessage = `Please enter a valid password with the following criteria:<br>
                    - Minimum six characters<br>
                    - At least one letter<br>
                    - At least one number<br>
                    - At least one special character
                   `;

export const EmailField: Fields = {
  label: "Email address",
  id: "email",
  type: "email",
  required: true,
  placeholder: "Email address",
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
  requiredMessage: "Email is required",
  patternMessage: `Please enter a valid email address in the format<br>
     yourname@example.com.`,
};

export const PasswordField: Fields = {
  label: "Password",
  id: "password",
  type: "password",
  required: true,
  placeholder: "Password",
  pattern: PasswordRegex,
  requiredMessage: "Password is required",
  patternMessage: PasswordValidationMessage,
};
