import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VtYW4wOSIsImEiOiJja3ZtYmZ3ZHMwd3B1MnBrbGFzMjJ2NGZuIn0.XIuFDC5Ofw7mGJFT2XHbGQ";

const Map: React.FC<any> = (props) => {
  const pickaddToMap = (
    map: mapboxgl.Map,
    coordinates: mapboxgl.LngLatLike
  ) => {
    // marker 1
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  const dropaddToMap = (
    map: mapboxgl.Map,
    coordinates: mapboxgl.LngLatLike
  ) => {
    // marker 2
    new mapboxgl.Marker({ color: "#b40219" }).setLngLat(coordinates).addTo(map);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
      center: [80, 21],
      zoom: 3,
    });

    map.resize();
    if (props.getpickup) {
      pickaddToMap(map, props.getpickup);
    }
    if (props.getdropoff) {
      dropaddToMap(map, props.getdropoff);
    }
    //auto zoom
    if (props.getpickup && props.getdropoff) {
      map.fitBounds([props.getpickup, props.getdropoff], {
        padding: 60,
      });
    }

    return () => {
      map.remove();
    };
  }, [props.getpickup, props.getdropoff]);

  return <div id="map" className="h-[90%]"></div>;
};

export default Map;
