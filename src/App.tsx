import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
