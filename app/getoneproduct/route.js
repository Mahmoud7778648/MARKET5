// app/api/getoneproduct/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import ProductModal from "../../DBCconfig/models/product";

// دالة الـ GET لجلب بيانات المنتج
export async function GET(request) {
  await connectMongoDB(); // الاتصال بقاعدة البيانات

  // الحصول على المعرف من الـ URL (query parameters)
  const id = request.nextUrl.searchParams.get("id");

  // البحث عن المنتج بناءً عى الـ ID
  const data = await ProductModal.findOne({
    _id: id,
  });
  console.log(data);
  return NextResponse.json(data); // إعادة البيانات كـ JSON
}
