import { useCookies } from "react-cookie";
import { IUser } from "../constants/interfaces/authResponse";

export type UserDataCookie = Pick<IUser, "email" | "name">;

function useUserCookie() {
  const [userCookie, setUserCookie, removeCookie] = useCookies(["user"]);

  const setUser = (userData: UserDataCookie) => {
    setUserCookie("user", userData);
  };

  const removeUser = () => {
    removeCookie("user");
  };

  return { user: userCookie.user as UserDataCookie, setUser, removeUser };
}

export default useUserCookie;
