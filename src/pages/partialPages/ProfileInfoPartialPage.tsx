import { CiCircleInfo } from "react-icons/ci";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axiosClient from "../../axios";
import { Input, Skeleton } from "../../components";
import { IUser } from "../../constants/interfaces/authResponse";
import DefaultResponse from "../../constants/interfaces/defaultResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import { EmailField } from "../../constants/commonFields";
import { useEffect, useState } from "react";

export type GetUserSuccessResponse = DefaultResponse & {
  user: IUser;
};

const ProfileInfoPartialPage = () => {
  const [userFormDisable] = useState(true);
  const { query } = useRequestProcessor();

  const { data, isLoading } =
    query<GetUserSuccessResponse>(() => axiosClient.get("/user"), {
      queryKey: ["CurrentUser"],
      refetchOnWindowFocus: false,
    });

  const user = data?.data.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
      email: user?.email,
    } as IUser,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (UserformData) => {
    const userform = { ...UserformData } as IUser;
    if (userFormDisable) return;
    console.log(userform);
  };

  useEffect(() => {
    reset({
      name: user?.name || "",
      gender: user?.gender || "",
      email: user?.email || "",
    });
  }, [user]);

  if (isLoading)
    return (
      <div className="p-4 w-1/2">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-7 my-2 w-1/3 rounded-md" />
        <Skeleton className="h-7 mt-4 mb-2 w-1/4 rounded-md" />
        <Skeleton className="h-7 my-2 w-1/2 rounded-md" />
        <Skeleton className="h-7 mt-4 mb-2 w-1/4 rounded-md" />
        <Skeleton className="h-7 my-2 w-2/5 rounded-md" />
        <Skeleton className="h-7 mt-4 mb-2 w-1/4 rounded-md" />
        <Skeleton className="h-7 my-2 w-9/12 rounded-md" />
      </div>
    );

  return (
    <>
      <div className="p-4">
        <div className="flex gap-2 items-center">
          <CiCircleInfo />
          <p className="dark:text-gray-400 italic text-sm">
            Please wait momentarily. We will soon provide you with the option to
            update your profile information
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <h1 className=" text-xl mb-4">Profile Information</h1>
            <div className="max-w-[15rem]">
              <Input
                label="Full Name"
                id="name"
                type="text"
                required={true}
                requiredMessage="Full Name is required"
                key="name"
                disabled={userFormDisable}
                register={register}
                errors={errors}
              />
            </div>
            <div className="my-4 ">
              <h1 className="dark:text-orange-500">Gender</h1>
              <input
                type="radio"
                id="male"
                value="male"
                disabled={userFormDisable}
                {...register("gender")}
              />{" "}
              <label htmlFor="male" className=" mr-4">
                Male
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                disabled={userFormDisable}
                {...register("gender")}
              />{" "}
              <label htmlFor="female" className=" mr-4">
                Female
              </label>
              <input
                type="radio"
                id="others"
                value="others"
                disabled={userFormDisable}
                {...register("gender")}
              />{" "}
              <label htmlFor="others">Others</label>
            </div>
          </div>
          <div>
            <div className=" max-w-[30rem]">
              <Input
                {...EmailField}
                disabled={userFormDisable}
                key="email"
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfoPartialPage;
