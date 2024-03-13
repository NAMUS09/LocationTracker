import React from "react";
import { Skeleton } from "..";

const LocationCardSkeleton: React.FC<{ number?: number }> = ({
  number = 1,
}) => {
  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          className="card shadow-md p-2 bg-slate-400 rounded-md my-1"
        >
          {[...Array(3)].map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-1 my-1">
              <Skeleton
                key={`locationCardSkeleton-1-${index}`}
                className=" rounded-lg h-4 w-full"
              />
              <Skeleton
                key={`locationCardSkeleton-2-${index}`}
                className=" rounded-lg h-4 w-full"
              />
            </div>
          ))}
          <Skeleton
            key={`locationCardSkeleton-3-${index}`}
            className=" rounded-lg h-4 w-2/3"
          />
        </div>
      ))}
    </>
  );
};

export default LocationCardSkeleton;
