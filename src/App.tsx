import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-full md:h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-500">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
