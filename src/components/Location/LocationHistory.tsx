import React from "react";
import axiosClient from "../../axios";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import DefaultResponse from "../../constants/interfaces/defaultResponse";
import { GeoLocationSensorState } from "../../hooks/useGeoLocation";
import LocationHistoryBox from "./LocationHistoryBox";

export type LocationHistory = Pick<
  GeoLocationSensorState,
  Exclude<keyof GeoLocationSensorState, "loading" | "error">
> & {
  _id: string;
  CapturedOn: string;
};

type SuccessResponse = DefaultResponse & {
  locations: LocationHistory[];
};

type LocationHistoryProps = {
  setPastLocation: React.Dispatch<
    React.SetStateAction<{
      longitude: number | null;
      latitude: number | null;
    } | null>
  >;
};

const LocationHistory: React.FC<LocationHistoryProps> = ({
  setPastLocation,
}) => {
  const { query } = useRequestProcessor();

  const { data, status } = query<SuccessResponse>(
    () => axiosClient.get("/location/location-history"),
    {
      queryKey: [],
      refetchOnWindowFocus: false,
    }
  );

  const locationHistory = data?.data.locations;
  return (
    <>
      {status === "error" && <h1>Failed to Fetch...</h1>}
      {status === "pending" && <h1>Fetching...</h1>}
      {status === "success" &&
        (locationHistory?.length ? (
          <div className="h-full">
            <div className="font-bold">Location History</div>
            <p className="text-xs fw italic mb-1 dark:text-slate-300">
              Your last 5 tracked location history:
            </p>
            <div className="h-full overflow-y-auto">
              <LocationHistoryBox
                locations={locationHistory}
                setPastLocation={setPastLocation}
              />
            </div>
          </div>
        ) : (
          <div>No location history</div>
        ))}
    </>
  );
};

export default LocationHistory;
