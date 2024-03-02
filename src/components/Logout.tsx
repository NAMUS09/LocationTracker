import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios";
import { useRequestProcessor } from "../hooks/useRequestProcessor";
import { useAppDispatch } from "../hooks/useStore";
import useUserCookie from "../hooks/useUserCookie";
import { logout } from "../store/authSlice";
import DefaultResponse from "../constants/interfaces/defaultResponse";

const Logout = () => {
  const navigate = useNavigate();
  const { useMutate } = useRequestProcessor();
  const dispatch = useAppDispatch();
  const { removeUser } = useUserCookie();

  const { mutate, isPending } = useMutate(
    ["LOGOUT"],
    () => axiosClient.get("/user/logout"),
    {
      onSuccess: (res) => {
        const response = (res as AxiosResponse).data as DefaultResponse;
        removeUser();
        dispatch(logout());
        toast.success(response.resultMessage.en);
        navigate("/login");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to Logout!!");
      },
    }
  );

  const handleLogout = async () => {
    mutate();
  };
  return (
    <>
      <div
        onClick={handleLogout}
        className="flex gap-2 self-center items-center dark:text-white cursor-pointer"
      >
        <IoMdLogOut />
        {isPending ? "logging out..." : "Logout"}
      </div>
    </>
  );
};

export default Logout;
