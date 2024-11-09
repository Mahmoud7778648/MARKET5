import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import ProductModal from "../../DBCconfig/models/product";

export async function GET(request) {
  await connectMongoDB();

  const data = await ProductModal.find();

  console.log("done");
  return NextResponse.json(data);
}
