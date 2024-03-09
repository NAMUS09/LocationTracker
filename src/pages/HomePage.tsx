import axiosClient from "../axios";
import { useRequestProcessor } from "../hooks/useRequestProcessor";
import DefaultResponse from "../constants/interfaces/defaultResponse";
import { Map } from "../components";
import { GeoLocationSensorState } from "../hooks/useGeoLocation";
import LocationHistoryBox from "../components/Location/LocationHistoryBox";
import { useAppSelector } from "../hooks/useStore";
import { useState } from "react";

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

const HomePage = () => {
  const { query } = useRequestProcessor();

  const currentUserLocation = useAppSelector((state) => state.curentLocation);
  const [pastLocation, setPastLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  } | null>(null);

  const { data, isFetching, isFetched, isError } = query<SuccessResponse>(
    () => axiosClient.get("/location/location-history"),
    { queryKey: ["locations"], refetchOnWindowFocus: false }
  );

  const locationHistory = data?.data.locations;

  return (
    <>
      <div className="flex w-full h-full flex-wrap md:flex-nowrap">
        <div className="map w-full md:w-2/3 lg:min-w-[66.66%] h-full p-2">
          <Map
            currentLocation={currentUserLocation}
            otherLocation={pastLocation}
          />
        </div>
        <div className="location-history w-full md:flex-grow p-2">
          {isFetching ? (
            <h1>Fetching...</h1>
          ) : isError ? (
            <h1>Failed to Fetch...</h1>
          ) : isFetched && locationHistory?.length ? (
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
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
