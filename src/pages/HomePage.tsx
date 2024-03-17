import { Skeleton, LocationHistory, Map } from "../components";
import { Suspense, useState } from "react";

const HomePage = () => {
  const [pastLocation, setPastLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  } | null>(null);

  return (
    <>
      <main className="flex w-full h-full flex-wrap md:flex-nowrap">
        <section className="map w-full md:w-2/3 lg:min-w-[66.66%] h-full p-2">
          <Suspense
            fallback={
              <Skeleton className="h-[20rem] sm:h-[30rem] lg:h-[50rem] w-full rounded-md" />
            }
          >
            <Map otherLocation={pastLocation} />
          </Suspense>
        </section>
        <section className="location-history w-full md:flex-grow p-2">
          <LocationHistory setPastLocation={setPastLocation} />
        </section>
      </main>
    </>
  );
};

export default HomePage;
