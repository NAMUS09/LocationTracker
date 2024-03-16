import RegisterImage from "../assets/register.png";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
  return (
    <main className="flex flex-wrap md:flex-nowrap h-full justify-around items-center p-12">
      <div className="hover:scale-75 duration-150">
        <img
          src={RegisterImage}
          className="w-100 max-h-[18rem] sm:max-h-[60rem]"
          alt="register page image"
        />
      </div>
      <div className="w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
            Create an
            <span className="font-bold text-orange-500"> account</span>
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <Register />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
