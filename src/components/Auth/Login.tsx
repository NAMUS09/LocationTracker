import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "..";
import axiosClient from "../../axios";
import { LoginResponse } from "../../constants/interfaces/authResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import { useAppDispatch } from "../../hooks/useStore";
import { login } from "../../store/authSlice";
import { loginFields } from "../../constants";

const fields = loginFields;

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
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

  const { mutate, isPending } = useMutate<LoginResponse, LoginForm>(
    ["LOGIN"],
    (formData) => axiosClient.post("/user/login", formData),
    {
      onSuccess: (res) => {
        reset();
        const { user, resultMessage } = res.data;
        // setUser(user);
        dispatch(login(user));
        toast.success(resultMessage.en);
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to Login");
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = async (formLoginData) => {
    const loginform = { ...formLoginData } as LoginForm;
    mutate(loginform);
  };
  return (
    <>
      <div className="p-4 sm:rounded-lg sm:px-10">
        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <Input
              key={field.id}
              label={field.labelText}
              id={field.id}
              type={field.type}
              required={field.isRequired}
              register={register}
              errors={errors}
              disabled={isPending}
            />
          ))}
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
