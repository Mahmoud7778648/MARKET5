"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export const AdminForm = () => {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [is, setIs] = useState(false);
  const [is2, setIs2] = useState(false);
  const [is3, setIs3] = useState(false);
  const [is4, setIs4] = useState(false);
  const [is5, setIs5] = useState(false);
  const [is6, setIs6] = useState(false);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [sizes, setSizes] = useState([]); // حالة جديدة لتخزين الأحجام
  const { id } = useParams();
  const handleSizeClick = (size, isSet) => {
    if (isSet) {
      setSizes((prevSizes) => [...prevSizes, size]); // إضافة الحجم إلى المصفوفة
    } else {
      setSizes((prevSizes) => prevSizes.filter((s) => s !== size)); // إزالة الحجم من المصفوفة
    }
  };

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setError(null);

    if (!title || !price || !description) {
      setError("Please enter all inputs");
      return;
    }

    const formData = new FormData();
    // img.forEach((file) => {
    //   formData.append("img", file);
    // });

    const response = await fetch("https://9mkvjl-3001.csb.app/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price, description, sizes, id }),
    });

    if (response.ok) {
      const res = response.json();
      eo.target.reset();
    } else {
      const errorMessage = await response.text();
      setError(errorMessage);
    }
  };

  return (
    <section className="bg-gradient-to-tl from-gray-700 to-primary-700 w-full h-full dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-slate-900 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-700 md:text-2xl dark:text-white">
              Update Product
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* <div>
                <label
                  htmlFor="img"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Product Img
                </label>
                <input
                  onChange={(eo) => {
                    const filesArray = Array.from(eo.target.files);
                    setImg(filesArray);
                  }}
                  type="file"
                  name="img"
                  id="img"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  multiple
                />
              </div> */}

              <div>
                <label
                  htmlFor="Title"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Title
                </label>
                <input
                  onChange={(eo) => {
                    setTitle(eo.target.value);
                  }}
                  type="text"
                  name="Title"
                  id="Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label
                  htmlFor="Price"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Price
                </label>
                <input
                  onChange={(eo) => {
                    setPrice(eo.target.value);
                  }}
                  type="number"
                  name="Price"
                  placeholder="$99.9"
                  id="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="m-4">
                <button
                  onClick={(click) => {
                    setIs(!is);
                    handleSizeClick("S", !is);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is ? "bg-slate-500" : ""
                  }`}
                >
                  S
                </button>

                <button
                  onClick={(click) => {
                    setIs2(!is2);
                    handleSizeClick("M", !is2);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is2 ? "bg-gray-500" : ""
                  }`}
                >
                  M
                </button>

                <button
                  onClick={(click) => {
                    setIs3(!is3);
                    handleSizeClick("XL", !is3);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is3 ? "bg-gray-500" : ""
                  }`}
                >
                  XL
                </button>

                <button
                  onClick={(click) => {
                    setIs4(!is4);
                    handleSizeClick("2XL", !is4);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is4 ? "bg-slate-500" : ""
                  }`}
                >
                  2XL
                </button>

                <button
                  onClick={(click) => {
                    setIs5(!is5);
                    handleSizeClick("3XL", !is5);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is5 ? "bg-slate-500" : ""
                  }`}
                >
                  3XL
                </button>

                <button
                  onClick={(click) => {
                    setIs6(!is6);
                    handleSizeClick("4XL", !is6);
                  }}
                  type="button"
                  className={`bg-slate-200 m-4 w-10 shadow-md text-black ${
                    is6 ? "bg-slate-500" : ""
                  }`}
                >
                  4XL
                </button>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-primary-700 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  onChange={(eo) => {
                    setDescription(eo.target.value);
                  }}
                  name="description"
                  id="description"
                  placeholder="Enter your description"
                  className="bg-gray-50 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-700 text-white w-full border transition-all duration-500 ease-in-out hover:scale-110 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium text-sm px-4 py-2 rounded-xl dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Update Product
              </button>

              <p className="text-red-700 uppercase">{error}</p>
              {console.log(sizes)}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminForm;
