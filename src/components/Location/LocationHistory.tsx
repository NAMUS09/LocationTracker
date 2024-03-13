import React from "react";
import axiosClient from "../../axios";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";

import LocationHistoryBox from "./LocationHistoryBox";
import { SuccessLocationHistoryResponse } from "../../constants/interfaces/locationResponse";
import { LocationCardSkeleton, Skeleton } from "..";

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

  if (isLoading)
    return (
      <>
        <Skeleton className="h-5 w-1/3 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md my-1" />
        <LocationCardSkeleton number={5} />
      </>
    );

  if (isError) return <h1>Failed to Fetch...</h1>;

  let locationHistory = data?.data.locations;

  if (!isLoading && isFetching) {
    locationHistory = locationHistory?.slice(0, -1);
  }

  return (
    <>
      {locationHistory?.length ? (
        <div className="h-full">
          <div className="font-bold">Location History</div>
          <p className="text-xs fw italic mb-1 dark:text-slate-300">
            Your last 5 tracked location history:
          </p>
          <div className="h-full overflow-y-auto">
            {!isLoading && isFetching && (
              <LocationCardSkeleton key="new-location-skeleton" />
            )}
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
