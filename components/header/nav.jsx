"use client";
import { Button } from "@mui/material";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Nav = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated" && session.user.email === "mn@admin.com") {
    return (
      <div className="flex">
        <Link
          href={"/cart"}
          className="text-white bg-black border border-spacing-7 transition-all duration-500 ease-in-out hover:text-white hover:scale-110 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-6 dark:bg-primary-600 rounded-xl dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <ShoppingCartIcon />
        </Link>
        <button
          className="text-slate-500 bg-white border border-spacing-7 transition-all duration-500 ease-in-out hover:text-white hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-6 dark:bg-primary-600 rounded-xl dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          onClick={(first) => {
            signOut();
          }}
        >
          sign out
        </button>
        <Link
          href={"/admin"}
          className="text-slate-500 bg-white border border-spacing-7 transition-all duration-500 ease-in-out hover:text-white hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-6 dark:bg-primary-600 rounded-xl dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          Add Product
        </Link>
        <p className="flex mt-2 text-black">
          welcom admin{" "}
          <span className="text-primary-700">({session.user.name})</span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <div className="flex items-center lg:order-2"></div>

      {status == "unauthenticated" && (
        <div>
          <Link
            href="signin"
            className=" text-slate-500 bg-white border border-spacing-7 transition-all duration-500 ease-in-out hover:text-white hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-6 dark:bg-primary-600 rounded-xl dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-slate-500 bg-white border border-spacing-7   transition-all duration-500 ease-in-out hover:scale-110 hover:bg-primary-700 hover:text-gray-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Get started
          </Link>
        </div>
      )}

      {status == "authenticated" && (
        <div className="flex">
          <button
            className="text-slate-500 bg-white border border-spacing-7 transition-all duration-500 ease-in-out hover:text-white hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-6 dark:bg-primary-600 rounded-xl dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            onClick={(first) => {
              signOut();
            }}
          >
            sign out
          </button>
          <p className="align-middle mt-2 ">
            welcom <span className="text-primary-700">{session.user.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};
export default Nav;
