const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md pt-8 pb-10 rounded-2xl text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col px-5 mt-7">
          <input
            placeholder="Email"
            className="outline-none border-2 focus:border-opacity-50 focus:border-green-600 bg-gray-100 mb-3 py-3 px-2 rounded-lg shadow-inner"
          />
          <input
            placeholder="Password"
            className="outline-none border-2 focus:border-opacity-50 focus:border-green-600 bg-gray-100 py-3 px-2 rounded-lg shadow-inner"
          />
          <button className="w-full py-3 px-5 bg-green-800 text-white mt-3 rounded-lg outline-none hover:opacity-90 transition-colors">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
