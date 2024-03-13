import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import useUserCookie from "../../hooks/useUserCookie";
import { login } from "../../store/authSlice";

type AuthProps = {
  children: ReactNode;
  authentication: boolean;
};

const Protected: React.FC<AuthProps> = ({
  children,
  authentication = true,
}) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);

  let authStatus = useAppSelector((state) => state.auth.status);
  const { user } = useUserCookie();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user != null && user.email) {
      dispatch(login(user));
      authStatus = true;
    }
  }, []);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setloader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <>
      <h2>loading...</h2>
    </>
  ) : (
    <>{children}</>
  );
};

export default Protected;