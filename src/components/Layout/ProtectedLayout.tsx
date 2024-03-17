import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LocationInfoBar from "../Location/LocationInfoBar";

const ProtectedLayout = () => (
  <>
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="bg-slate-400 text:black border-gray-400 dark:bg-gray-700 p-2">
        <LocationInfoBar />
      </div>
      <div className="md:flex-grow overflow-hidden m-1 h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
);

export default ProtectedLayout;
