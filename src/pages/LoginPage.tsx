import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginFields } from "../constants";
import Input from "../components/Input/Input";
import { useState } from "react";
import Button from "../components/Button";

const fields = loginFields;
// let fieldsState = {};
// fields.forEach((field) => (fieldsState[field.id] = ""));

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <main className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field) => (
                <Input
                  key={field.id}
                  label={field.labelText}
                  id={field.id}
                  type={field.type}
                  required={field.isRequired}
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              ))}
              <Button type="submit" fullWidth disabled={isLoading}>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
