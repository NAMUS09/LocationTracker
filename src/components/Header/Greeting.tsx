import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { UserDataCookie } from "../../hooks/useUserCookie";
import { LoginResponse } from "../../constants/interfaces/authResponse";

const Greeting = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  const username =
    (userData as UserDataCookie)?.name ||
    (userData as LoginResponse)?.user?.name;

  return (
    <div>
      <h1 className="text-sm sm:text-lg">
        Good {timeOfDay}, <span className="capitalize">{username}</span>!
      </h1>
    </div>
  );
};

export default Greeting;
