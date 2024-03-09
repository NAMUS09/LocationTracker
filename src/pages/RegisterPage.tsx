import RegisterImage from "../assets/register.png";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
  return (
    <main className="flex flex-wrap md:flex-nowrap h-full justify-around items-center p-12">
      <div className="w-full duration-150  hover:scale-[120%] col-span-6">
        <img src={RegisterImage} alt="register page image" />
      </div>
      <div className="w-full  col-span-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
            Create an
            <span className="font-bold text-orange-500"> account</span>
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Register />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
