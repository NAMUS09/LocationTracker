import { GeoLocationSensorState } from "../../hooks/useGeoLocation";
import DefaultResponse from "./defaultResponse";

export type LocationHistory = Pick<
  GeoLocationSensorState,
  Exclude<keyof GeoLocationSensorState, "loading" | "error">
> & {
  _id: string;
  CapturedOn: string;
};

export type SuccessLocationHistoryResponse = DefaultResponse & {
  page: number;
  locations: LocationHistory[];
};
