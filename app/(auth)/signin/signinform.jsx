"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("All input must be filled");
      return;
    }

    // sign in with email & password
    // Go to api/auth/[...nextauth]/route.js
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);

    if (res.error) {
      setError("INVALID EMAIL OR PASSWORD");
      return;
    }

    router.replace("/");
    // check if email not exist == return null
  };
  return (
    <section className="bg-gradient-to-tl from-gray-700 to-primary-700 w-full h-full dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-slate-900 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-700 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(eo) => setEmail(eo.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(eo) => setPassword(eo.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-700 text-white w-full border transition-all duration-500 ease-in-out hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 py-2 rounded-xl dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Log in
              </button>
              <p className="text-red-700 uppercase">{error}</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Create account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-700 hover:underline dark:text-primary-500"
                >
                  create account here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SigninForm;
