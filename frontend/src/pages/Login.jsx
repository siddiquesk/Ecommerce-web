import React, { useState } from "react";

function Login() {
  const [current, setCurrent] = useState("Signup");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex items-center justify-center max-w-7xl border-[2px] min-h-screen bg-slate-50 px-10 lg:m-auto">
      <form
        className="flex flex-col w-xl sm:max-w-2xl bg-white rounded-sm p-10 sm:p-8 gap-5 text-gray-700"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Heading */}
        <div className="inline-flex items-center gap-2">
          <p className="text-2xl sm:text-3xl font-semibold prata-regular">
            {current}
          </p>
          <hr className="border-none h-[2px] w-10 bg-gray-800" />
        </div>

        {/* Name field (only in Signup) */}
        {current === "Signup" && (
          <input
            type="text"
            className="w-full px-3 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Name"
            autoComplete="off"
            required
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Enter your email"
          autoComplete="new-email"
          required
        />

        <input
          type="password"
          className="w-full px-3 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Enter your password"
          autoComplete="new-password"
          required
        />

        {/* Links */}
        <div className="w-full flex flex-col sm:flex-row justify-between text-sm gap-2 sm:gap-0">
          <p className="cursor-pointer text-gray-600 hover:text-black">
            Forget your password?
          </p>
          {current === "Login" ? (
            <p
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => setCurrent("Signup")}
            >
              Create an account
            </p>
          ) : (
            <p
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => setCurrent("Login")}
            >
              Login here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="bg-black text-white text-base px-6 py-3  cursor-pointer rounded-md hover:bg-gray-900 transition">
          {current === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
