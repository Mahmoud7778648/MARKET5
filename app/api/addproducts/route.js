import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import ProductModal from "../../DBCconfig/models/product";
import { uploadStream } from "../../../helper/uploadFunctions";

export async function POST(request) {
  const frontend = await request.formData();

  const imgs = frontend.getAll("img"); // استخدم getAll لجلب جميع الصور
  const title = frontend.get("title");
  const price = frontend.get("price");
  const description = frontend.get("description");
  const sizes = frontend.getAll("sizes");

  const sizes2 = sizes[0].split(","); // تقسيم أول عنصر إلى قائمة

  console.log(imgs);
  console.log(sizes);

  // الاتصال بقاعدة البيانات
  await connectMongoDB();

  // رفع الصور والحصول على URL و Public ID لكل صورة
  const imgUrls = await Promise.all(
    imgs.map(async (img) => {
      const bytes = await img.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadedImg = await uploadStream(buffer); // رفع الصورة والحصول على رابطها
      return {
        url: uploadedImg.url,
        public_id: uploadedImg.public_id,
      };
    })
  );

  // حفظ بيانات المنتج مع روابط الصور في قاعدة البيانات
  await ProductModal.create({
    sizes: sizes2,
    img: imgUrls.map((img) => img.url), // تخزين قائمة الروابط فقط
    publicid: imgUrls.map((img) => img.public_id), // تخزين public_id لكل صورة
    title: title,
    price: price,
    description: description,
  });

  console.log("done");
  return NextResponse.json({ message: "Product added successfully" });
}
