import { Outlet } from "react-router-dom";
import { AccountSideBar } from "../AccountSettings/AccountSideBar";

const AccountPageLayout = () => {
  return (
    <>
      <main className="flex w-full h-full gap-2 dark:text-slate-300">
        <div className="w-1/5 bg-white dark:bg-gray-800 rounded-md">
          <AccountSideBar />
        </div>
        <section className="w-full bg-white dark:bg-gray-800 rounded-md overflow-hidden p-3">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AccountPageLayout;
