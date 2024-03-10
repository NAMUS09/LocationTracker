import { Login } from "../components";
import LoginImage from "../assets/login.png";

const LoginPage = () => {
  return (
    <>
      <main className="flex flex-wrap md:flex-nowrap h-full justify-around items-center p-12">
        <div className="w-[80%] hover:scale-75 duration-150">
          <img src={LoginImage} alt="login page image" />
        </div>
        <div className="w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
              Sign in to your
              <span className="font-bold text-orange-500"> account</span>
            </h2>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <Login />
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
