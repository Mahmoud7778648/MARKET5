import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import ProductModal from "../../DBCconfig/models/product";

export async function PUT(request) {
  const frontend = await request.json();

  console.log(frontend.sizes);
  await connectMongoDB();

  await ProductModal.updateOne(
    { _id: frontend.id },
    {
      sizes: frontend.sizes,
      title: frontend.title,
      price: frontend.price,
      description: frontend.description,
    }
  );
  console.log("done");
  return NextResponse.json({ message: "Product added successfully" });
}
