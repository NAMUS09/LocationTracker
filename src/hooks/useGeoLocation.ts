import { useEffect, useState } from "react";
import { useAppDispatch } from "./useStore";
import { setLocation } from "../store/currentLocationSlice";

export interface IGeolocationPositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

export interface GeolocationCoordinates {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GeoLocationSensorState extends GeolocationCoordinates {
  loading: boolean;
  timestamp: number | null;
  error?: Error | IGeolocationPositionError;
}

const useGeolocation = (options?: PositionOptions): GeoLocationSensorState => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
  });

  useEffect(() => {
    let watchId: number | null = null;

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp,
      });

      dispatch(
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        })
      );
    };

    const onError = (error: GeolocationPositionError) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error,
      }));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options
      );
    } else {
      const error = {
        code: 0,
        message: "Geoloction is not supported",
      } as IGeolocationPositionError;
      setState((prevState) => ({ ...prevState, loading: false, error }));
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
};

export default useGeolocation;
