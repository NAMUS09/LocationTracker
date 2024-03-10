import { Map } from "../components";
import LocationHistory from "../components/Location/LocationHistory";
import { useState } from "react";

const HomePage = () => {
  const [pastLocation, setPastLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  } | null>(null);

  return (
    <>
      <main className="flex w-full h-full flex-wrap md:flex-nowrap">
        <section className="map w-full md:w-2/3 lg:min-w-[66.66%] h-full p-2">
          <Map otherLocation={pastLocation} />
        </section>
        <section className="location-history w-full md:flex-grow p-2">
          <LocationHistory setPastLocation={setPastLocation} />
        </section>
      </main>
    </>
  );
};

export default HomePage;
