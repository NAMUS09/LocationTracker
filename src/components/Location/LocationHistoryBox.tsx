import { Location } from "../../pages/HomePage";

interface LocationHisory extends Location {
  _id?: string;
}
type LocationHisoryList = {
  locations: LocationHisory[];
};

const LocationHistoryBox: React.FC<LocationHisoryList> = ({ locations }) => {
  return (
    <>
      <div className="font-bold">Location History</div>
      <div className="flex flex-col gap-1">
        {locations.map((location) => {
          return (
            <div
              className="locationCard rounded overflow-hidden shadow-lg p-3 text-xs grid grid-cols-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 hover:bg-gray-200"
              key={location._id}
            >
              {(Object.keys(location) as (keyof typeof location)[]).map(
                (key, index) =>
                  key !== "_id" && (
                    <div key={index} className="min-w-10">
                      <span className="capitalize dark:text-red-500 font-bold">
                        {key} :{" "}
                      </span>
                      <span>
                        {(location[key] as unknown as string) ?? "unknown"}
                      </span>
                    </div>
                  )
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationHistoryBox;
