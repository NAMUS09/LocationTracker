import { Login } from "../components";

const LoginPage = () => {
  return (
    <>
      <main className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Login />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
