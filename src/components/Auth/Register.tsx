import { Link, useNavigate } from "react-router-dom";
import { signupFields } from "../../constants";
import Button from "../Button";
import Input from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import axiosClient from "../../axios";
import { RegisterReponse } from "../../constants/interfaces/authResponse";
import toast from "react-hot-toast";
import { useRef } from "react";

const fields = signupFields;

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  language?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { useMutate } = useRequestProcessor();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as RegisterForm,
  });

  const password = useRef({});
  password.current = watch("password", "");

  const { mutate, isPending } = useMutate<RegisterReponse, RegisterForm>(
    ["REGISTER"],
    (formData) => axiosClient.post("/user/register", formData),
    {
      onSuccess: (res) => {
        reset();
        const { resultMessage } = res.data;
        // // setUser(user);
        // dispatch(login(user));
        toast.success(resultMessage.en);
        navigate("/login");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to register your account!!");
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = async (formRegisterData) => {
    const registerForm = {
      ...formRegisterData,
      language: "en",
    } as RegisterForm;
    mutate(registerForm);
  };
  return (
    <>
      <div className="p-4  sm:rounded-lg sm:px-10">
        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <Input
              key={field.id}
              {...field}
              validationWatchValue={
                field.id === "confirmPassword" ? password.current : ""
              }
              register={register}
              errors={errors}
              disabled={isPending}
            />
          ))}
          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-bold text-orange-500 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
