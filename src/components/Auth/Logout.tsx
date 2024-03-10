import React from "react";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "../../hooks/useStore";
import { logout } from "../../store/authSlice";
import axiosClient from "../../axios";
import DefaultResponse from "../../constants/interfaces/defaultResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";

const Logout = React.forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { useMutate } = useRequestProcessor();

  const { mutate, isPending } = useMutate<DefaultResponse>(
    ["LOGOUT"],
    () => axiosClient.get("/user/logout"),
    {
      onSuccess: (res) => {
        dispatch(logout());
        queryClient.removeQueries();
        toast.success(res.data.resultMessage.en);
      },
      onError: (err) => {
        if (err.response?.status !== 401) toast.error("Failed to Logout!!");
      },
    }
  );

  const handleLogout = async () => {
    mutate();
  };
  return (
    <>
      <div
        ref={ref}
        {...props}
        onClick={handleLogout}
        className="flex gap-2 self-center items-center dark:text-white cursor-pointer"
      >
        <IoMdLogOut className="block h-6 w-6" aria-hidden="true" />
        {isPending ? "logging out..." : "Logout"}
      </div>
    </>
  );
});

export default Logout;
