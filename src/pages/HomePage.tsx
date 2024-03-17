import { Skeleton, LocationHistory, Map } from "../components";
import { Suspense, useState } from "react";

const HomePage = () => {
  const [pastLocation, setPastLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  } | null>(null);

  return (
    <>
      <main className="grid relative md:grid-cols-12 w-full h-full gap-2 p-2">
        <section className="map h-[20rem] md:col-span-8 md:h-full">
          <Suspense
            fallback={
              <Skeleton className="h-[20rem] sm:h-[30rem] lg:h-[50rem] w-full rounded-md" />
            }
          >
            <Map otherLocation={pastLocation} />
          </Suspense>
        </section>
        <section className="md:col-span-4 h-full w-full">
          <LocationHistory setPastLocation={setPastLocation} />
        </section>
      </main>
    </>
  );
};

export default HomePage;
