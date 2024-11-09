"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Adminbtn = ({ publicid }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const handledelete = async () => {
    const res = await fetch("https://9mkvjl-3001.csb.app/api/deleteproduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, publicid }),
    });
    if (res.ok) {
      const ress = await res.json();
    }
  };
  return (
    <div className="flex justify-center align-middle">
      <button
        onClick={handledelete}
        className="bg-red-700 mr-10 rounded-md shadow-md h-12 w-auto p-3 transition-all duration-500 hover:scale-110"
      >
        DELETE PRODUCT{" "}
      </button>
      <Link
        href={`/update/${id}`}
        className="bg-blue-700 mr-10 rounded-md shadow-md h-12 w-auto p-3 transition-all duration-500 hover:scale-110"
      >
        UPDATE PRODUCT{" "}
      </Link>
    </div>
  );
};

export default Adminbtn;
