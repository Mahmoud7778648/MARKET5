"use client";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Adminbtn from "./adminbtn";
import Aos from "aos";

const ProductDetails = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [img, setImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // إضافة متغير لحجم مختار

  useEffect(() => {
    Aos.init({
      duration: 1000, // مدة الحركة
      once: true, // الحركة تحدث مرة واحدة فقط
      offset: 200, // المسافة قبل أن يبدأ العنصر في التحرك
      easing: "ease-in-out", // تسهيل الحركة
    });

    if (!id) return;

    const getData = async () => {
      try {
        const res = await fetch(
          `https://9mkvjl-3001.csb.app/api/getoneproduct?id=${id}`
        );
        if (!res.ok) {
          setError(true);
          notFound();
        } else {
          const data = await res.json();
          setData(data);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };
    getData();
  }, [id]);

  if (error) {
    return <div>Product not found or an error occurred.</div>;
  }

  if (!data) {
    return (
      <div className="h-screen justify-center m-auto flex align-middle">
        <div className="border-gray-300 m-auto h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
      </div>
    );
  }

  const imgs = data.img;
  const sizes = data.sizes;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              {img ? (
                <img
                  data-aos="fade-up" // إضافة تأثير التحريك هنا
                  className="w-full h-full object-cover"
                  src={img}
                  alt="Product Image"
                />
              ) : (
                <img
                  data-aos="fade-up" // إضافة تأثير التحريك هنا
                  className="w-full h-full object-cover"
                  src={imgs[0]}
                  alt="Product Image"
                />
              )}
            </div>
            <div className="flex -mx-2 mb-4">
              <div
                data-aos="fade-up" // إضافة تأثير التحريك هنا
                className=" px-2 w-full"
              >
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  BUY
                </button>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up" // إضافة تأثير التحريك هنا
            className="md:flex-1 px-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {data.title}
            </h2>
            <p
              data-aos="fade-up" // إضافة تأثير التحريك هنا
              className="text-gray-600 dark:text-gray-300 text-sm mb-4"
            >
              {data.description}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span
                  data-aos="fade-up" // إضافة تأثير التحريك هنا
                  className="font-bold text-gray-700 dark:text-gray-300"
                >
                  Price:
                </span>
                <span className="text-primary-700 ml-2 dark:text-gray-300">
                  {data.price} $
                </span>
              </div>
            </div>
            <div
              data-aos="fade-up" // إضافة تأثير التحريك هنا
              className="mb-4"
            >
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div
                data-aos="fade-up" // إضافة تأثير التحريك هنا
                className="flex bg-slate-400 border-4 shadow-md w-auto items-center mt-2"
              >
                {imgs.map((img, index) => (
                  <img
                    key={index}
                    className="w-32 mx-3 my-3 h-36 border transition-all duration-500 hover:scale-110"
                    src={img}
                    onClick={() => setImg(img)}
                    alt={`Product Image ${index}`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div
                data-aos="fade-up" // إضافة تأثير التحريك هنا
                className="flex items-center mt-2"
              >
                {sizes.length > 1 && (
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Select Size:
                  </span>
                )}
                {sizes.length > 1 &&
                  sizes.map((item, i) => (
                    <div
                      data-aos="fade-up" // إضافة تأثير التحريك هنا
                      key={i}
                    >
                      <button
                        onClick={() => setSelectedSize(item)} // تعيين الحجم المختار
                        className={`bg-primary-700 rounded-md shadow-md h-12 w-16 transition-all duration-500 hover:scale-110 m-6 ${
                          selectedSize === item ? "scale-110" : "" // تكبير الزر المختار
                        }`}
                      >
                        {item}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p
                data-aos="fade-up" // إضافة تأثير التحريك هنا
                className="text-gray-600 dark:text-gray-300 text-sm mt-2"
              >
                {data.description}
              </p>
            </div>
          </div>
        </div>
        {status === "authenticated" &&
          session.user.email === "mn@admin.com" && (
            <Adminbtn publicid={data.publicid} />
          )}
      </div>
    </div>
  );
};

export default ProductDetails;
