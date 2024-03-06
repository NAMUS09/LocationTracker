import axiosClient from "../axios";
import { useRequestProcessor } from "../hooks/useRequestProcessor";
import DefaultResponse from "../constants/interfaces/defaultResponse";
import { Map } from "../components";
import { GeoLocationSensorState } from "../hooks/useGeoLocation";
import LocationHistoryBox from "../components/Location/LocationHistoryBox";
import { useAppSelector } from "../hooks/useStore";

export type Location = Pick<
  GeoLocationSensorState,
  Exclude<keyof GeoLocationSensorState, "loading" | "error">
> & {
  _id: number;
};

type SuccessResponse = DefaultResponse & {
  locations: Location[];
};

const HomePage = () => {
  const { query } = useRequestProcessor();

  const currentUserLocation = useAppSelector((state) => state.curentLocation);

  const { data, isFetching, isFetched, isError } = query<SuccessResponse>(
    () => axiosClient.get("/location/location-history"),
    { queryKey: ["locations"], refetchOnWindowFocus: false }
  );

  const locationHistory = data?.data.locations;

  return (
    <>
      <div className="flex w-full h-full flex-wrap md:flex-nowrap">
        <div className="map w-full md:w-2/3 lg:min-w-[66.66%] h-full p-2">
          <Map {...currentUserLocation} />
        </div>
        <div className="location-history w-full md:flex-grow p-2">
          {isFetching ? (
            <h1>Fetching...</h1>
          ) : isError ? (
            <h1>Failed to Fetch...</h1>
          ) : isFetched && locationHistory?.length ? (
            <LocationHistoryBox locations={locationHistory} />
          ) : (
            <div>No location history</div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
