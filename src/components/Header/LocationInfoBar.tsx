import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosClient from "../../axios";
import DefaultResponse from "../../constants/interfaces/defaultResponse";
import useGeolocation from "../../hooks/useGeoLocation";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import { HiLocationMarker } from "react-icons/hi";

const positionOptions: PositionOptions = {
  maximumAge: 0,
};

const LocationInfoBar = () => {
  const location = useGeolocation(positionOptions);
  const isLoading = location.loading;

  const { useMutate } = useRequestProcessor();

  const { mutate } = useMutate<DefaultResponse, GeolocationCoordinates>(
    ["SAVE LOCATION"],
    (currentLocation) =>
      axiosClient.post("/location/save-location", currentLocation),
    {
      onSuccess: (res) => {
        const response = res.data;
        toast.success(response.resultMessage.en);
      },
      onError: (err) => {
        console.log(err.message);
        toast.error("Failed to save location");
      },
    }
  );

  useEffect(() => {
    if (!isLoading && location.longitude && location.latitude) {
      // uncomment this to save in database
      // const {
      //   longitude,
      //   latitude,
      //   speed,
      //   accuracy,
      //   altitude,
      //   altitudeAccuracy,
      //   heading,
      // } = location;
      // mutate({
      //   speed,
      //   accuracy,
      //   altitude,
      //   altitudeAccuracy,
      //   longitude,
      //   latitude,
      //   heading,
      // } as GeolocationCoordinates);
    }
  }, [isLoading]);

  return (
    <>
      <div className="sm:flex  justify-between dark:text-white text-xs gap-2 items-center px-1">
        <div className="py-2 sm:p-0 flex gap-2 text-base items-center">
          <HiLocationMarker className="text-blue-500 text-lg" />
          Current Location
        </div>

        <div className="flex flex-wrap sm:gap-4 gap-2">
          {(Object.keys(location) as (keyof typeof location)[])
            .filter((key) => key !== "loading" && key !== "timestamp")
            .map((key, index) => (
              <div key={index} className=" min-w-10">
                <span className="capitalize text-red-500 font-bold">
                  {key} :{" "}
                </span>
                <span>
                  {location[key]
                    ? (location[key] as unknown as string)
                    : isLoading
                    ? "fetching..."
                    : "unknown"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LocationInfoBar;
