import { NextResponse } from "next/server";
import { connectMongoDB } from "../../DBCconfig/connectdb";
import UserModal from "../../DBCconfig/models/user";

export async function POST(request) {
  const frontend = await request.json();

  await connectMongoDB();

  const user = await UserModal.findOne({
    email: frontend.email,
  });
  console.log(user);
  console.log("done");
  return NextResponse.json({ user });
}
