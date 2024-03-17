import { useEffect, useState } from "react";
import mapboxgl, { LngLat, LngLatBoundsLike } from "mapbox-gl";
import { useAppSelector } from "../../hooks/useStore";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_GL;

type LocationMarker = {
  longitude: number | null;
  latitude: number | null;
};

type LocationMarkers = {
  otherLocation?: LocationMarker | null;
};

const Map: React.FC<LocationMarkers> = ({ otherLocation = null }) => {
  const [userLocationTracked, setUserLocationTracked] = useState(false);
  const currentUserLocation = useAppSelector((state) => state.currentLocation);
  const { longitude, latitude } = currentUserLocation;

  const markLocation = (map: mapboxgl.Map, coordinates: LngLat) => {
    // Create a default marker
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  const pastMarkLocation = (map: mapboxgl.Map, coordinates: LngLat) => {
    // Create a past location marker
    new mapboxgl.Marker({
      color: "#FFA500",
    })
      .setLngLat(coordinates)
      .addTo(map);
  };

  useEffect(() => {
    const defaultCoordinates = new LngLat(80, 21);
    const coordinates =
      !!longitude && !!latitude
        ? new LngLat(longitude, latitude)
        : defaultCoordinates;

    if (coordinates !== defaultCoordinates) {
      setUserLocationTracked(true);
    }

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: coordinates,
      zoom: userLocationTracked ? 16 : 3,
    });

    const bounds: LngLatBoundsLike = [
      [coordinates.lng - 0.00005, coordinates.lat - 0.00005],
      [coordinates.lng + 0.00005, coordinates.lat + 0.00005],
    ];

    if (otherLocation?.latitude && otherLocation?.longitude) {
      const pastLocationCoordinates = new LngLat(
        otherLocation.longitude,
        otherLocation.latitude
      );
      pastMarkLocation(map, pastLocationCoordinates);

      bounds[1] = [
        pastLocationCoordinates.lng + 0.00005,
        pastLocationCoordinates.lat + 0.00005,
      ];
    }

    // current location
    if (latitude && longitude) {
      // mark user current location
      markLocation(map, coordinates);
      map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
    }

    return () => {
      map.remove();
    };
  }, [longitude, latitude, otherLocation?.longitude, otherLocation?.latitude]);

  return (
    <div
      id="map"
      className="w-full max-h-[20rem] sm:max-h-[25rem] md:max-h-[40rem] lg:h-full lg:max-h-[50rem]"
    ></div>
  );
};

export default Map;
