import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import UserModal from "../../DBCconfig/models/user";
import bcrypt from "bcrypt";

export async function POST(request) {
  const frontend = await request.json();
  await connectMongoDB();

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(frontend.password, salt);

  await UserModal.create({
    name: frontend.name,
    email: frontend.email,
    password: hashedPassword,
  });

  console.log("done");
  return NextResponse.json({});
}
