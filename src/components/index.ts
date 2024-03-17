import { lazy } from "react";

//dynamically imported
const Header = lazy(() => import("./Header/Header"));
const Footer = lazy(() => import("./Footer/Footer"));
const Login = lazy(() => import("./Auth/Login"));
const Logout = lazy(() => import("./Auth/Logout"));
const Register = lazy(() => import("./Auth/Register"));
const Protected = lazy(() => import("./Auth/Protected"));
const Map = lazy(() => import("./Map/Map"));

import Button from "./Button/Button";
import Input from "./Input/Input";
import TableSkeleton from "./Skeleton/TableSkeleton";
import Skeleton from "./Skeleton/Skeleton";
import LocationCardSkeleton from "./Skeleton/LocationCardSkeleton";
import Toggle from "./Toggle/Toggle";
import { AccountSideBar } from "./AccountSettings/AccountSideBar";
import LocationHistory from "./Location/LocationHistory";
import LocationInfoBar from "./Location/LocationInfoBar";
import Loading from "./Loading/Loading";

export {
  Header,
  Footer,
  Login,
  Logout,
  Register,
  Protected,
  Map,
  Button,
  Input,
  TableSkeleton,
  Skeleton,
  Toggle,
  AccountSideBar,
  Loading,
  LocationHistory,
  LocationInfoBar,
  LocationCardSkeleton,
};
