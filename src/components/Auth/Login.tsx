import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Input, Button } from "..";
import axiosClient from "../../axios";
import { LoginResponse } from "../../constants/interfaces/authResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import { useAppDispatch } from "../../hooks/useStore";
import { login } from "../../store/authSlice";
import { loginFields } from "../../constants";
import DefaultResponse from "../../constants/interfaces/defaultResponse";

const fields = loginFields;

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { useMutate } = useRequestProcessor();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    } as LoginForm,
  });

  const { mutate, isPending } = useMutate<
    LoginResponse,
    LoginForm,
    DefaultResponse
  >(["LOGIN"], (formData) => axiosClient.post("/user/login", formData), {
    onSuccess: (res) => {
      reset();
      const { user, resultMessage, accessToken, refreshToken } = res.data;
      const saveUser = { user, accessToken, refreshToken };
      dispatch(login(saveUser));
      localStorage.setItem("User", JSON.stringify(saveUser));
      toast.success(resultMessage.en);
    },
    onError: (err) => {
      console.log(err.response?.data.resultMessage.en);
      toast.error(err.response?.data.resultMessage.en ?? "Failed to Login");
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formLoginData) => {
    const loginform = { ...formLoginData } as LoginForm;
    mutate(loginform);
  };
  return (
    <>
      <div className="p-2 sm:p-4 sm:rounded-lg sm:px-10">
        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <Input
              key={field.id}
              {...field}
              register={register}
              errors={errors}
              disabled={isPending}
            />
          ))}
          {/* <p className="text-end">
            <Link to="/reset-password">
              <span className="font-bold text-orange-500 cursor-pointer italic hover:underline">
                Forgot Password ?
              </span>
            </Link>
          </p> */}
          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="font-bold text-orange-500 cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
