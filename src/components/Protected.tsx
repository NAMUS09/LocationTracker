import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  children: ReactNode;
  authentication: boolean;
};

const Protected: React.FC<AuthProps> = ({
  children,
  authentication = true,
}) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [loader, setloader] = useState(true);

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
