import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginFields } from "../constants";
import Input from "../components/Input/Input";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { useRequestProcessor } from "../hooks/useRequestProcessor";
import axiosClient from "../axios";
import { LoginResponse } from "../constants/interfaces/authResponse";
import { useAppDispatch } from "../hooks/useStore";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import useUserCookie from "../hooks/useUserCookie";
import { AxiosResponse } from "axios";

const fields = loginFields;

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { useMutate } = useRequestProcessor();
  const dispatch = useAppDispatch();
  const { setUser } = useUserCookie();

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

  const { mutate, isPending } = useMutate(
    ["LOGIN"],
    (formData) => axiosClient.post("/user/login", formData),
    {
      onSuccess: (res) => {
        reset();
        const { user, resultMessage } = (res as AxiosResponse)
          .data as LoginResponse;
        setUser(user);
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
                  disabled={isPending}
                />
              ))}
              <Button type="submit" fullWidth disabled={isPending}>
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
