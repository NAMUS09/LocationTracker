import moment from "moment";
import axiosClient from "../../axios";
import { SuccessLocationHistoryResponse } from "../../constants/interfaces/locationResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";

const LocationHistoryPartialPage = () => {
  const userLocale = navigator.language;
  const { useInfinite } = useRequestProcessor();

  const { data, isLoading, isError, fetchNextPage } =
    useInfinite<SuccessLocationHistoryResponse>(
      ({ pageParam = 0 }) =>
        axiosClient.post("/location/location-history", {
          limit: 10,
          page: pageParam,
        }),
      {
        initialPageParam: 1,
        queryKey: ["LocationHistoryInfinite"],
        refetchOnWindowFocus: false,
        getNextPageParam: (axiosResponse, allPages) => {
          const responseData = axiosResponse.data;
          return responseData.locations.length > 0 && responseData.page + 1;
        },
      }
    );

  if (isLoading) return "Loading";
  if (isError) return "Error";

  const locationHistory = data?.pages;

  return (
    <>
      <div>
        <button onClick={() => fetchNextPage()}>Fetch more</button>
        <div className="h-full">
          <div className="font-bold">Location History</div>
          <div className="h-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Accuracy</th>
                  <th>Altitude</th>
                  <th>Altitude Accuracy</th>
                  <th>Heading</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Captured On</th>
                </tr>
              </thead>
              <tbody>
                {locationHistory?.map((group) =>
                  group.data.locations.map((location) => (
                    <tr key={location._id}>
                      <td>{location.accuracy ?? "unknown"}</td>
                      <td>{location.altitude ?? "unknown"}</td>
                      <td>{location.altitudeAccuracy ?? "unknown"}</td>
                      <td>{location.heading ?? "unknown"}</td>
                      <td>{location.latitude}</td>
                      <td>{location.longitude}</td>
                      <td>
                        {moment(location.CapturedOn)
                          .locale(userLocale)
                          .format("LLL")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationHistoryPartialPage;
