import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  pattern?: RegExp;
  validate?: boolean;
  validationWatchValue?: {};
  requiredMessage?: string;
  patternMessage?: string;
  validationMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  pattern,
  validate = false,
  validationWatchValue,
  requiredMessage,
  patternMessage,
  validationMessage,
}) => {
  const registerOptions: RegisterOptions<FieldValues, string> = {};

  // required
  required &&
    (registerOptions.required = requiredMessage
      ? requiredMessage
      : "This is required");

  // pattern
  pattern &&
    (registerOptions.pattern = {
      value: pattern,
      message: patternMessage ? patternMessage : "Pattern is invalid",
    });

  // validate
  validate &&
    (registerOptions.validate = (value) =>
      value === validationWatchValue ||
      validationMessage ||
      "The values do not match");

  return (
    <div>
      <label
        className="block text-sm leading-6 text-gray-900 dark:text-orange-500 font-bold"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, registerOptions)}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-gray-900
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />

        {/* For single Erorr Message */}
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => (
            <p
              className=" text-red-900 italic text-sm"
              dangerouslySetInnerHTML={{
                __html: `${message}`,
              }}
            ></p>
          )}
        />

        {/* For multiple Erorr Message */}
        {/* <ErrorMessage
          errors={errors}
          name={id}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p className="text-red-600 italic" key={type}>
                {message}
              </p>
            ))
          }
        /> */}
      </div>
    </div>
  );
};

export default Input;
