import { NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
import { connectMongoDB } from "../../DBCconfig/connectdb";
import ProductModal from "../../DBCconfig/models/product";

export async function DELETE(request) {
  const frontend = await request.json();

  await connectMongoDB(); // الاتصال بقاعدة البيانات

  await ProductModal.deleteOne({
    _id: frontend.id,
  });

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  await cloudinary.uploader.destroy(frontend.publicid);
  console.log("done");
  return NextResponse.json({}); // إعادة البيانات كـ JSON
}
