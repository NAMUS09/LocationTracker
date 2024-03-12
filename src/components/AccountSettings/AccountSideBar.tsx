import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export const AccountSideBar = () => {
  const location = useLocation();
  const sideBarMenus = [
    {
      name: "Profile Information",
      href: "/account/profile",
      current: location.pathname === "/account/profile",
    },
    {
      name: "Tracking Preferences",
      href: "/account/tracking",
      current: location.pathname === "/account/tracking",
    },
    {
      name: "Location History",
      href: "/account/location-history",
      current: location.pathname === "/account/location-history",
    },
  ];
  return (
    <aside>
      <div className="heading-top">
        <div className="flex text-center tracking-wide  items-center gap-3 uppercase p-3 text-gray-500 border-b-[1px] border-gray-500">
          <MdOutlineAccountCircle
            className="block h-6 w-6"
            aria-hidden="true"
          />
          Account Settings
        </div>
        <div className="flex flex-col">
          {sideBarMenus.map((menu) => {
            return (
              <Link
                key={menu.name}
                className={
                  "py-3 text-left px-12 rounded-md hover:text-white text-red-500 " +
                  (menu.current
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-700")
                }
                to={menu.href}
                aria-current={menu.current ? "page" : undefined}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
