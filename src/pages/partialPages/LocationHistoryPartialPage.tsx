import moment from "moment";
import axiosClient from "../../axios";
import { SuccessLocationHistoryResponse } from "../../constants/interfaces/locationResponse";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import { useEffect, useRef } from "react";
import { TableSkeleton } from "../../components";

const headers = [
  "Accuracy",
  "Altitude",
  "Altitude Accuracy",
  "Heading",
  "Latitude",
  "Longitude",
  "Captured On",
];

const LocationHistoryPartialPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const userLocale = navigator.language;
  const { useInfinite } = useRequestProcessor();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfinite<SuccessLocationHistoryResponse>(
    ({ pageParam = 0 }) =>
      axiosClient.post("/location/location-history", {
        limit: 12,
        page: pageParam,
      }),
    {
      initialPageParam: 1,
      queryKey: ["LocationHistoryInfinite"],
      refetchOnWindowFocus: false,
      getNextPageParam: (axiosResponse) => {
        const responseData = axiosResponse.data;

        if (responseData.nextPage == 0) return undefined;

        return responseData.nextPage;
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!divRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = divRef.current;

      if (scrollTop + clientHeight + 20 >= scrollHeight) {
        fetchNextPage();
      }
    };

    if (!divRef.current) return;

    divRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (!divRef.current) return;
      divRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [divRef.current]);

  const locationHistory = data?.pages;

  return (
    <>
      <div
        className=" relative w-full h-full shadow-md sm:rounded-lg overflow-auto"
        ref={divRef}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && <TableSkeleton row={15} column={headers.length} />}

            {isError && <h1>Error...</h1>}

            {locationHistory?.map((group) =>
              group.data.locations.map((location) => (
                <tr
                  key={location._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-3">
                    {location.accuracy ?? "unknown"}
                  </td>
                  <td className="px-6 py-3">
                    {location.altitude ?? "unknown"}
                  </td>
                  <td className="px-6 py-3">
                    {location.altitudeAccuracy ?? "unknown"}
                  </td>
                  <td className="px-6 py-3">{location.heading ?? "unknown"}</td>
                  <td className="px-6 py-3">{location.latitude}</td>
                  <td className="px-6 py-3">{location.longitude}</td>
                  <td className="px-6 py-3">
                    {moment(location.CapturedOn)
                      .locale(userLocale)
                      .format("LLL")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {!isLoading && isFetchingNextPage && (
            <tfoot>
              <TableSkeleton row={3} column={headers.length} />
            </tfoot>
          )}
          {!hasNextPage && (
            <tfoot>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                  colSpan={headers.length}
                  className="text-center py-3 text-red-500"
                >
                  {" "}
                  End of the road! No more locations to fetch.
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default LocationHistoryPartialPage;
