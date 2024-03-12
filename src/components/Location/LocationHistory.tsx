import React from "react";
import axiosClient from "../../axios";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";

import LocationHistoryBox from "./LocationHistoryBox";
import { SuccessLocationHistoryResponse } from "../../constants/interfaces/locationResponse";

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

  const { data, isLoading, isError, isFetching } =
    query<SuccessLocationHistoryResponse>(
      () => axiosClient.post("/location/location-history"),
      {
        queryKey: ["LocationHistory"],
        refetchOnWindowFocus: false,
      }
    );

  if (isLoading) return <h1>Fetching...</h1>;

  if (isError) return <h1>Failed to Fetch...</h1>;

  const locationHistory = data?.data.locations;
  return (
    <>
      {locationHistory?.length ? (
        <div className="h-full">
          <div className="font-bold">Location History</div>
          <p className="text-xs fw italic mb-1 dark:text-slate-300">
            Your last 5 tracked location history:
          </p>
          <div className="h-full overflow-y-auto">
            {!isLoading && isFetching && <h1>Loading new data...</h1>}
            <LocationHistoryBox
              locations={locationHistory}
              setPastLocation={setPastLocation}
            />
          </div>
        </div>
      ) : (
        <div>No location history</div>
      )}
    </>
  );
};

export default LocationHistory;
