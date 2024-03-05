import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useStore";
import { logout } from "../store/authSlice";
import axiosClient from "../axios";
import DefaultResponse from "../constants/interfaces/defaultResponse";
import { useRequestProcessor } from "../hooks/useRequestProcessor";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { useMutate } = useRequestProcessor();

  const { mutate, isPending } = useMutate<DefaultResponse>(
    ["LOGOUT"],
    () => axiosClient.get("/user/logout"),
    {
      onSuccess: (res) => {
        dispatch(logout());
        toast.success(res.data.resultMessage.en);
        navigate("/login");
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
