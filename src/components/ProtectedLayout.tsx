import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const ProtectedLayout = () => (
  <>
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="md:flex-grow overflow-hidden p-1 mb-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
);

export default ProtectedLayout;
