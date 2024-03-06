import { useEffect } from "react";
import mapboxgl, { LngLat, LngLatBoundsLike } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VtYW4wOSIsImEiOiJja3ZtYmZ3ZHMwd3B1MnBrbGFzMjJ2NGZuIn0.XIuFDC5Ofw7mGJFT2XHbGQ";

type LocationMarker = {
  longitude: number | null;
  latitude: number | null;
};

const Map: React.FC<LocationMarker> = (props) => {
  const { longitude, latitude } = props;

  const markLocation = (map: mapboxgl.Map, coordinates: LngLat) => {
    // Create a default marker
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  useEffect(() => {
    const coordinates = new LngLat(longitude ?? 80, latitude ?? 21);

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: coordinates,
      zoom: 6,
    });

    if (latitude && props.longitude) {
      // mark user current location
      markLocation(map, coordinates);

      const bounds: LngLatBoundsLike = [
        [coordinates.lng - 0.00005, coordinates.lat - 0.00005],
        [coordinates.lng + 0.00005, coordinates.lat + 0.00005],
      ];
      map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
    }

    return () => {
      map.remove();
    };
  }, [props]);

  return (
    <div
      id="map"
      className="w-full max-h-[20rem] sm:max-h-[25rem] md:max-h-[40rem] lg:h-[90%] "
    ></div>
  );
};

export default Map;
