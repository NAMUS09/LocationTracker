import { useState } from "react";
import moment from "moment";
import { HiLocationMarker } from "react-icons/hi";
import { LocationHistory } from "../../constants/interfaces/locationResponse";

type LocationHisoryList = {
  locations: LocationHistory[];
  setPastLocation: React.Dispatch<
    React.SetStateAction<{
      longitude: number | null;
      latitude: number | null;
    } | null>
  >;
};

const LocationHistoryBox: React.FC<LocationHisoryList> = ({
  locations,
  setPastLocation,
}) => {
  const [selectedPastLocation, setSelectedPastLocation] = useState<
    string | null
  >(null);
  const userLocale = navigator.language;

  const handleClick = (location: LocationHistory) => {
    const { _id, longitude, latitude } = location;
    setPastLocation(() =>
      selectedPastLocation === location._id ? null : { longitude, latitude }
    );
    setSelectedPastLocation(selectedPastLocation === location._id ? null : _id);
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        {locations.map((location) => {
          return (
            <div
              className={
                (selectedPastLocation === location._id
                  ? "dark:bg-gray-600 bg-gray-400 "
                  : "dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600   ") +
                "locationCard rounded overflow-hidden shadow-md p-[.68rem] lg:gap-[0.2rem] text-xs grid grid-cols-2 dark:text-white cursor-pointer relative"
              }
              onClick={() => handleClick(location)}
              key={location._id}
            >
              {(Object.keys(location) as (keyof typeof location)[]).map(
                (key, index) =>
                  key !== "_id" && (
                    <div key={index} className="min-w-10">
                      <span className="capitalize text-red-500 font-bold">
                        {key} :{" "}
                      </span>
                      <span>
                        {key == "CapturedOn"
                          ? moment(
                              location[key] as unknown as moment.MomentInput
                            )
                              .locale(userLocale)
                              .format("LLL")
                          : (location[key] as unknown as string) ?? "unknown"}
                      </span>
                    </div>
                  )
              )}
              {selectedPastLocation === location._id && (
                <HiLocationMarker className="text-orange-500 text-2xl absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationHistoryBox;
