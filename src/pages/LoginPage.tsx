import { Login } from "../components";
import LoginImage from "../assets/login.webp";

const LoginPage = () => {
  return (
    <>
      <main className="min-h-dvh flex flex-col md:flex-row h-full justify-around items-center sm:p-12">
        <div className="hover:scale-75 duration-150 md:flex-1">
          <img
            src={LoginImage}
            className="w-100 max-h-[17rem] sm:max-h-[60rem]"
            alt="login page image"
          />
        </div>
        <div className="md:flex-1">
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
