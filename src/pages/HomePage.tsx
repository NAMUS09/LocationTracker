import axiosClient from "../axios";
import { useRequestProcessor } from "../hooks/useRequestProcessor";
import DefaultResponse from "../constants/interfaces/defaultResponse";
import { Map } from "../components";
import { GeoLocationSensorState } from "../hooks/useGeoLocation";
import LocationHistoryBox from "../components/Location/LocationHistoryBox";

export type Location = Pick<
  GeoLocationSensorState,
  Exclude<keyof GeoLocationSensorState, "loading" | "error">
>;

type SuccessResponse = DefaultResponse & {
  locations: Location[];
};

const HomePage = () => {
  const { query } = useRequestProcessor();

  const { data, isFetching, isFetched, isError } = query<SuccessResponse>(
    ["locations"],
    () => axiosClient.get("/location/location-history"),
    { refetchOnWindowFocus: false }
  );

  const locationHistory = data?.data.locations;

  return (
    <>
      <div className="flex w-full h-full flex-wrap">
        <div className="map md:w-2/3 h-full p-2">
          <Map key="MapId" />
        </div>
        <div className="location-history md:flex-grow p-2">
          {isFetching && <h1>Fetching...</h1>}
          {!isFetching && isError && <h1>Failed to Fetch...</h1>}

          {!isFetching && isFetched && !!locationHistory?.length && (
            <LocationHistoryBox locations={locationHistory} />
          )}

          {!isFetching && isFetched && !locationHistory?.length && (
            <div>No location history</div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
