import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiMiniXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoMdHome } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import Logout from "../Auth/Logout";
import Greeting from "./Greeting";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const location = useLocation();
  const navigation = [
    { name: "Dashboard", href: "/", current: location.pathname === "/" },
  ];
  return (
    <Disclosure as="nav" className="bg-slate-300 dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiMiniXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <RxHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex sm:flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-col px-12 sm:p-0 sm:flex-row  flex-shrink-0 items-center">
                  <Link
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                    to="/"
                  >
                    <img
                      src={logo}
                      className=" h-4 sm:h-8"
                      alt="Location Tacker Logo"
                    />
                    <span className="sm:self-center text-base sm:text-2xl font-semibold whitespace-nowrap tracking-tight dark:text-white">
                      Location Tracker
                    </span>
                  </Link>
                  <h2 className="dark:text-slate-100 block sm:hidden">
                    <Greeting />
                  </h2>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 "
                            : "text-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium text-white"
                        )}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <div className="flex self-center items-center gap-2">
                          <IoMdHome
                            className="block h-4 w-4"
                            aria-hidden="true"
                          />{" "}
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <h2 className="dark:text-slate-100 hidden sm:block">
                <Greeting />
              </h2>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="user image"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 dark:text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? "bg-gray-100 dark:bg-gray-600" : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-white"
                            )}
                            to="/account"
                          >
                            <div className="flex self-center items-center gap-2">
                              <MdOutlineAccountCircle
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />{" "}
                              My Profile
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100 dark:bg-gray-600" : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-white"
                            )}
                          >
                            <Logout />
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
