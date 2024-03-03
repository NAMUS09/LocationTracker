import { Outlet, useNavigate } from "react-router-dom";
import useUserCookie from "./hooks/useUserCookie";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useStore";
import { login } from "./store/authSlice";

function App() {
  const { user } = useUserCookie();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null && user.email) {
      dispatch(login(user));
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center bg-white dark:bg-slate-500">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
