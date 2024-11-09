"use client";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useState } from "react";

const Signupform = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please enter all inputs");
      return;
    }

    const resUserExist = await fetch("/api/isuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const isUserExists = await resUserExist.json();
    if (isUserExists.user) {
      setError("User already exists");
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      eo.target.reset();
      router.push("/signin");
    } else {
      // notFound();
    }
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Your name
                </label>
                <input
                  onChange={(eo) => setName(eo.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Your name"
                />
              </div>
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
                Create an account
              </button>
              <p className="text-red-700 uppercase">{error}</p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary-700 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signupform;
