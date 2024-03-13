import { CiCircleInfo } from "react-icons/ci";
import { Toggle } from "../../components";
import { useEffect, useState } from "react";

type Preferences = {
  AutoSaveAfterLogin: boolean;
  AutoSaveOnLocationChange: boolean;
};

const TrackingPreferencesPartialPage = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    AutoSaveAfterLogin: false,
    AutoSaveOnLocationChange: false,
  });

  useEffect(() => {
    const userPreferencesString = localStorage.getItem("UserPreferences");
    if (!userPreferencesString) return;

    const userPreference = JSON.parse(userPreferencesString) as Preferences;

    setPreferences(userPreference);
  }, []);

  const handleToggle = (key: keyof Preferences, newValue: boolean) => {
    setPreferences((prevValue) => ({ ...prevValue, [key]: newValue }));
    localStorage.setItem(
      "UserPreferences",
      JSON.stringify({ ...preferences, [key]: newValue })
    );
  };

  return (
    <>
      <div className="p-4">
        <div className="heading">
          <h1 className="text-xl">Location Trackipreng Preferences</h1>
          <div className="flex gap-2 items-center">
            <CiCircleInfo />
            <p className="dark:text-gray-400 italic text-sm">
              Change your tracking preferences here
            </p>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-3">
          <div className="flex justify-between">
            <h1>Enable Automatic Location Saving Upon Login</h1>
            <Toggle
              key="AutoSaveAfterLogin"
              currentState={preferences.AutoSaveAfterLogin}
              setState={(newValue) =>
                handleToggle("AutoSaveAfterLogin", newValue)
              }
            />
          </div>
          <div className="flex justify-between">
            <h1>After Logging In, Automatically Save Location Updates</h1>
            <Toggle
              key="AutoSaveOnLocationChange"
              currentState={preferences.AutoSaveOnLocationChange}
              setState={(newValue) =>
                handleToggle("AutoSaveOnLocationChange", newValue)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPreferencesPartialPage;
