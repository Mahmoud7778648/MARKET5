"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AOS from "aos"; // استيراد مكتبة AOS
import "aos/dist/aos.css"; // استيراد أنماط AOS
import Aos from "aos";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ThemeProvider } from "styled-components";
import { useParams } from "next/navigation";

export const Products = () => {
  const [data, setData] = useState([]);
  const { data: session, status } = useSession();

  const [darkMode, setDarkMode] = useState(false); // حالة للتحكم في الثيم
  useEffect(() => {
    Aos.init({
      duration: 1000, // مدة الحركة
      once: true, // الحركة تحدث مرة واحدة فقط
      offset: 200, // المسافة قبل أن يبدأ العنصر في التحرك
      easing: "ease-in-out", // تسهيل الحركة
    });

    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/getproducts");
      if (!res.ok) {
        notFound(); // تأكد من تعريف دالة notFound إذا كنت تستخدمها
      }
      const data = await res.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <div>
      <div>
        <Button
          className={`bg-black ${darkMode ? "bg-slate-100" : "bg-slate-950"}`}
          onClick={(click) => {
            setDarkMode(!darkMode);
          }}
          variant="contained"
        >
          Toggle Theme
        </Button>
      </div>
      <div
        className={`bg-gray-100 justify-center flex  border-8 align-middle relative left-auto m-auto w-10/12 mt-7 mb-15 h-auto gap-1 flex-wrap ${
          darkMode ? "bg-slate-950" : "bg-slate-100"
        } `}
      >
        {data.length > 0 && status === "authenticated"
          ? data.map((product, index) => (
              <div
                data-aos="fade-up" // إضافة تأثير التحريك هنا
                className="h-1/4  cursor-pointer mx-10 my-10 w-1/5 flex items-center justify-center transition-all duration-500 hover:scale-110  bg-gray-200 dark:bg-gray-800"
                key={index}
              >
                <article
                  className={`max-w-sm w-full   shadow-lg overflow-hidden dark:bg-gray-700 ${
                    darkMode ? "bg-slate-900" : "bg-slate-100"
                  }`}
                >
                  <Link href={`/product-details/${product._id}`} key={index}>
                    <img
                      className="object-cover h-64 w-full"
                      src={product.img[0]}
                      alt="Product image"
                    />
                  </Link>
                  <div className="flex flex-col gap-1 mt-4 px-4">
                    <h2
                      className={`text-lg font-semibold  ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {product.title}
                    </h2>
                    <span className="font-normal text-gray-600 dark:text-gray-300">
                      {product.description}
                    </span>
                    <span className="font-semibold text-primary-700 dark:text-gray-50 ">
                      {product.price} $
                    </span>
                  </div>

                  <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
                    <Button
                      onClick={(AddCart) => {
                        localStorage.setItem(
                          "product",
                          JSON.stringify(product)
                        );
                      }}
                      className="bg-gradient-to-tr from-primary-700 to-purple-600 transition-transform duration-500 hover:scale-105 hover:shadow-lg"
                      variant="contained"
                      endIcon={<AddShoppingCartIcon />}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </article>
              </div>
            ))
          : status === "loading" && (
              <div className="h-screen m-auto flex justify-center align-middle">
                <div
                  role="status"
                  className="h-44 m-auto flex justify-center align-middle"
                >
                  <svg
                    aria-hidden="true"
                    className="w-2/3 h-2/3 text-gray-200 flex m-auto justify-center align-middle animate-spin dark:text-gray-600 fill-blue-700"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
        {status === "unauthenticated" && (
          <p className="flex m-auto justify-center align-middle">
            PLEASE LOGIN TO SEE OUR PRODUCTS{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
