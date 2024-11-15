import Link from "next/link";
import React from "react";
import Nav from "./nav";

export const Header = () => {
  return (
    <header>
      <nav className="bg-white shadow-2xl border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Nav />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
